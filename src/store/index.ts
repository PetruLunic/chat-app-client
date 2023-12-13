import {combineReducers, configureStore, PayloadAction} from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import siderReducer from './reducers/SiderSlice';
import contactsReducer from './reducers/ContactsSlice';
import messagesReducer from './reducers/MessagesSlice';
import {authAPI} from "@services/authAPI";
import {userAPI} from "@services/userAPI";
import {messagesAPI} from "@services/userAPI/messagesAPI";
import {contactsAPI} from "@services/userAPI/contactsAPI";
import {searchAPI} from "@services/userAPI/searchAPI";
import {contactsRequestAPI} from "@services/userAPI/contactRequestAPI";

const combinedReducer = combineReducers({
    user: userReducer,
    sider: siderReducer,
    contacts: contactsReducer,
    messages: messagesReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [messagesAPI.reducerPath]: messagesAPI.reducer,
    [contactsAPI.reducerPath]: contactsAPI.reducer,
    [contactsRequestAPI.reducerPath]: contactsRequestAPI.reducer,
    [searchAPI.reducerPath]: searchAPI.reducer
});

const rootReducer = (state: any, action: PayloadAction) => {
    // reseting all state after user/disconnect action
    if (action.type === 'user/disconnect') {
        return combinedReducer(undefined, action);
    }
    return combinedReducer(state, action);
};


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(userAPI.middleware)
            .concat(messagesAPI.middleware)
            .concat(contactsAPI.middleware)
            .concat(contactsRequestAPI.middleware)
            .concat(searchAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;