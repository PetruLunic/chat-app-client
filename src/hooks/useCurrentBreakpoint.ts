import {Grid} from 'antd'
const {useBreakpoint} = Grid;

export const useCurrentBreakpoint = () => {
    const screens = useBreakpoint();

    const breackpoints =  Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => screen[0]);

    return breackpoints[breackpoints.length - 1];
}