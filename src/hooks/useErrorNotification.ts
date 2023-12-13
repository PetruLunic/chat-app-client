import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
import {App} from "antd";
import {useEffect} from "react";
import {isErrorWithMessage} from "@helpers/rtkErrorTypeChecks";

export function useErrorNotification (errors: Array<FetchBaseQueryError | SerializedError | undefined>, optionalMessage: string = "Unexpected error"){
    const {notification} = App.useApp();

    useEffect(() => {
        if (!errors?.length) return;

        errors.forEach((err) => {
            if (err){
                const message = isErrorWithMessage(err)
                    ? err.data.message
                    : optionalMessage

                notification.error({
                    message
                })
            }
        })
    }, errors)
}