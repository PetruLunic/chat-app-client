import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "@types";

const baseUrl = (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/") + 'user/';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({
        baseUrl,
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