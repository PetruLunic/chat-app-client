import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IMessage, IUser} from "../../types";


export const searchAPI = createApi({
    reducerPath: 'searchAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/user/search/',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    endpoints: (build) => ({
        users: build.query<IUser[], string>({
            query: (username) => ({
                url: `users?username=${username}`
            })
        })
    })
})