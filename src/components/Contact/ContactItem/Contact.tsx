import React from 'react';
import {ContactType, IUser} from "../../../types";
import {useAppSelector} from "../../../hooks/redux";
import ContactDefault from "./types/ContactDefault";
import ContactRequestIn from "./types/ContactRequestIn";
import ContactRequestOut from "./types/ContactRequestOut";
import ContactUnrelated from "./types/ContactUnrelated";
import ContactSkeletons from "../ContactSkeletons";


interface ContactProps{
    contact: IUser;
    type?: ContactType;
}

const Contact: React.FC<ContactProps> = ({contact, type = 'default'}) => {

    if (type === 'requestIn'){
        return <ContactRequestIn contact={contact}/>;
    } else if (type === 'requestOut'){
        return <ContactRequestOut contact={contact}/>;
    } else if (type === 'unrelated'){
        return <ContactUnrelated contact={contact}/>;
    }

    return <ContactDefault contact={contact}/>;
};

export default Contact;