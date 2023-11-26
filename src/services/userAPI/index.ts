import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../../types";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/user/',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    endpoints: (build) => ({
        getUser: build.query<IUser, void>({
            query: () => ({
                url: 'getUser'
            })
        }),
    })
})