import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser, IUserLogin} from "../types";


export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/'}),
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