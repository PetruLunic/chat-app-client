import { Avatar } from 'antd';
import React, {FC, memo, useEffect, useState} from 'react';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

interface ContactAvatarProps{
    name: string
}

const ContactAvatar: FC<ContactAvatarProps> = memo(({name}) => {
    const [color, setColor] = useState<string>('#f56a00');
    const [initials, setInitials] = useState<string>()

    useEffect(() => {
        setInitials(
            name
            .split(" ")
            .map((el: string) => el[0])
            .join(""))

        setColor(ColorList[Math.floor(Math.random() * ColorList.length)])
    }, [])

    return (
        <Avatar size={55} style={{backgroundColor: color, verticalAlign: 'middle', fontWeight: 'bold', fontSize: '17px'}} gap={1}>
            {initials}
        </Avatar>
    );
});

export default ContactAvatar;