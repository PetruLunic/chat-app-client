import {useLayoutEffect, useRef, useState} from "react";
import {useAppSelector} from "./redux";
import {IUser} from "../types";


export function useIsChangingContact(isFetching: boolean): boolean{
    const [isChanging, setIsChanging] = useState(false);
    const activeContact = useAppSelector(state => state.contacts.active);
    const prevContact = useRef<IUser | null>(null);

    // On every refetch check if active contact was changed
    useLayoutEffect(() => {
        if (activeContact !== prevContact.current && isFetching){
            setIsChanging(true);
            prevContact.current = activeContact;
        }

        if (!isFetching){
            setIsChanging(isFetching);
        }
    }, [isFetching]);

    return isChanging;
}