import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

interface CustomError{
    status: number;
    data: {
        message: string;
    }
}

export function isFetchBaseQueryError(
    error: unknown
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'data' in error;
}

export function isErrorWithMessage(error: unknown): error is CustomError{
    return isFetchBaseQueryError(error) && typeof error.data === 'object' && error.data != null && 'message' in error.data
}