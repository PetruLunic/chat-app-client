import {IUser} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface ContactsState{
    contacts: IUser[],
    active: IUser | null,
    loaded: boolean
}

const initialState: ContactsState = {
    contacts: [],
    active: null,
    loaded: false
}

export const ContactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts(state, action: PayloadAction<IUser[]>){
            state.contacts = action.payload;
            state.loaded = true;
        },
        setActive(state, action: PayloadAction<IUser | null>){
            state.active = action.payload;
        }
    }
})

export const {actions} = ContactsSlice;

export default ContactsSlice.reducer;