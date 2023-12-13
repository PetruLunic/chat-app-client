import {createContext} from "react";
import {IMessage} from "@types";


export const MessageContext = createContext<IMessage | null>(null);
export const EditMessageContext = createContext((edit: boolean) => {})