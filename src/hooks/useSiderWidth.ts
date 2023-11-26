import {useCurrentBreakpoint} from "./useCurrentBreakpoint";
import {useMemo} from "react";


export const useSiderWidth = () => {
    const breakpoint = useCurrentBreakpoint();
    return useMemo(() => {
        switch(breakpoint){
            case 'xs':
                return '100vw';
            case 'sm':
            case 'md':
                return '350px';

            default:
                return '300px'
        }
    }, [breakpoint]);
}