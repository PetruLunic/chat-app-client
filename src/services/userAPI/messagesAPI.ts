import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IMessage} from "../../types";

const baseUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/") + 'user/message';

export const messagesAPI = createApi({
    reducerPath: 'messagesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        },
    }),
    keepUnusedDataFor: 0,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Messages'],
    endpoints: (build) => ({
        get: build.query<IMessage[], string | undefined>({
            query: (id) => ({
                url: `get/${id}`
            }),
            providesTags: ['Messages'],
        }),
        add: build.mutation<IMessage, IMessage>({
            query: (message) => ({
                url: 'add',
                body: {
                    message
                },
                method: 'POST'
            }),
            async onQueryStarted(message, { dispatch, queryFulfilled }) {
                message = JSON.parse(JSON.stringify(message));

                const prevPatchResult = dispatch(
                    messagesAPI.util.updateQueryData('get', message.to, (draft) => {
                        draft.push(message);
                    })
                )

                try {
                    await queryFulfilled;
                    prevPatchResult.undo();
                } catch {
                    prevPatchResult.undo();
                }
            },
            invalidatesTags: ["Messages"]
            }),
        edit: build.mutation<void, IMessage>({
            query: ({_id, text}) => ({
                url: `edit/${_id}`,
                body: {
                    text
                },
                method: 'PATCH'
            }),
            async onQueryStarted({_id, text, to}, { dispatch, queryFulfilled }) {
                const prevPatchResult = dispatch(
                    messagesAPI.util.updateQueryData('get', to, (draft) => {
                        draft.forEach(message => {
                            if (message._id === _id){
                                message.text = text;
                            }
                        })
                    })
                )

                try {
                    await queryFulfilled;
                } catch {
                    prevPatchResult.undo();
                    messagesAPI.util.invalidateTags(["Messages"])
                }
            },
        }),
        delete: build.mutation<void, string>({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Messages"]
        }),

    })
})