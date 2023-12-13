import {IUser} from "@types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface UserState{
    user: IUser;
    connected: boolean;
    isLoaded: boolean;
}

const initialState: UserState = {
    user: {},
    connected: false,
    isLoaded: false
} as UserState

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        connect(state, action: PayloadAction<IUser>){
            state.user = action.payload;
            state.connected = true;
        },

        disconnect(state){
            state.user = {} as IUser;
            state.connected = false;
        },
        setIsLoaded(state, action: PayloadAction<boolean>){
            state.isLoaded = action.payload;
        }
    }
})

export const actions =  UserSlice.actions;
export default UserSlice.reducer