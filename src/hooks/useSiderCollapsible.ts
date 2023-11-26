import {useMemo} from "react";
import {useCurrentBreakpoint} from "./useCurrentBreakpoint";


export const useSiderCollapsible = () => {
    const breakpoint = useCurrentBreakpoint()
    return useMemo(() => {
        switch(breakpoint){
            case 'xl':
            case 'lg':
                return false;

            default:
                return true
        }
    }, [breakpoint])
}