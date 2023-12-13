import {IMessage} from "@types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface MessagesState{
    messages: IMessage[];
    isLoading: boolean;
}

const initialState: MessagesState = {
    messages: [],
    isLoading: false
}

export const MessagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        loadMessages(state, action: PayloadAction<IMessage[]>){
            state.messages = action.payload;
        },
        addMessage(state, action: PayloadAction<IMessage>){
            state.messages.push(action.payload);
        },
        setIsLoading(state, action: PayloadAction<boolean>){
            state.isLoading = action.payload
        },
        // editMessage(state, action: PayloadAction<{id: string, text: string}>){
        //     // const {id, text} = action.payload;
        //     //
        //     // state.messages.forEach(el => {
        //     //     if (el._id === id){
        //     //         el.text = text;
        //     //     }
        //     // });
        // },
        // deleteMessage(state, action: PayloadAction<string>){
        //     // const id = action.payload;
        //     //
        //     // console.log(id);
        //     //
        //     // state.messages = state.messages.filter(el => el._id !== id);
        // }
    }
})

export const {actions} = MessagesSlice;

export default MessagesSlice.reducer;