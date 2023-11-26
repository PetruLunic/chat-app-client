import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface SiderState{
    collapsed: boolean;
    state: 'default' | 'search' | 'contactRequests';
    subState: string;
    search: string;
}

const initialState: SiderState = {
    collapsed: false,
    state: 'default',
    subState: '',
    search: ''
}

export const SiderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        setCollapsed(state, action: PayloadAction<boolean>){
            state.collapsed = action.payload;
        },
        setDefaultState(state){
            state.state = 'default';
            state.subState = '';
        },
        setSearchState(state){
            state.state = 'search';
            state.subState = 'local';
        },
        setContactRequestsState(state){
            state.state = 'contactRequests';
            state.subState = 'incoming';
        },
        setSubState(state, action: PayloadAction<string>){
            state.subState = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>){
            state.search = action.payload;
        }
    }
})

export const {actions} = SiderSlice;

export default SiderSlice.reducer;