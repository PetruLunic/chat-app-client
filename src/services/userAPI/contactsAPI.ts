import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../../types";

const baseUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/") + 'user/contacts/';
export const contactsAPI = createApi({
    reducerPath: 'contactsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    tagTypes: ['Contacts'],
    endpoints: (build) => ({
        get: build.query<IUser[], void>({
            query: () => ({
                url: 'get'
            }),
            providesTags: ['Contacts']
        }),
        add: build.mutation<void, string>({
            query: (id) => ({
                url: 'add',
                method: 'POST',
                body: {
                    id
                }
            }),
            invalidatesTags: ['Contacts']
        }),
        delete: build.mutation<void, string>({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Contacts']
        }),
        deleteWithMessages: build.mutation<void, string>({
            query: (id) => ({
                url: `delete/${id}/?messages`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Contacts']
        }),
    })
})