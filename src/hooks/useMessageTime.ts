import {useMemo} from "react";


export const useMessageTime = (date: Date) => {
    return useMemo(() => {
        date = new Date(date);

        let minutes = date.getMinutes().toString();
        if (minutes.length < 2) minutes = `0${minutes}`;

        let hours = date.getHours().toString();
        if (hours.length < 2) hours = `0${hours}`;

        return {minutes, hours};
    }, [])
}