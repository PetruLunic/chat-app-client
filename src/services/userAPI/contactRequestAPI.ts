import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "@types";

const baseUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/") + 'user/contacts/request';

export const contactsRequestAPI = createApi({
    reducerPath: 'contactsRequestAPI',
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
    tagTypes: ['RequestsIn', 'RequestsOut'],
    endpoints: (build) => ({
        getIn: build.query<IUser[], string>({
            query: (name) => ({
                url: `get/in/?name=${name}`,
            }),
            providesTags: ['RequestsIn']
        }),
        getOut: build.query<IUser[], string>({
            query: (name) => ({
                url: `get/out/?name=${name}`
            }),
            providesTags: ['RequestsOut']
        }),
        add: build.mutation<void, string>({
            query: (id) => ({
                url: 'add',
                method: 'POST',
                body: {id}
            }),
            invalidatesTags: ['RequestsOut']
        }),
        delete: build.mutation<void, string>({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['RequestsIn', 'RequestsOut']
        }),
    })
})