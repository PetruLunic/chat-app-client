import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, IUserLogin} from "../types";

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        login: build.mutation<IUser, IUserLogin>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user
            })
        }),
        registration: build.mutation<IUser, IUserLogin>({
            query: (user) => ({
                url: `registration`,
                method: 'POST',
                body: user
            })
        }),

    })
})