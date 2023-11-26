export interface IMessage{
    _id?: string;
    date: Date;
    from: string;
    to: string;
    text: string;
}

export interface IUser{
    id: string;
    username: string;
    token?: string;
}

export interface IUserLogin{
    username: string;
    password: string;
}

export type ContactType = 'default' | 'requestIn' | 'requestOut' | 'unrelated';