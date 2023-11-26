import React, {FC} from 'react';
import {Flex, Skeleton} from "antd";

const ContactSkeletons: FC = () => {
    return (
        <Flex gap='middle' vertical>
            <Skeleton avatar title={false} loading={true} active></Skeleton>
            <Skeleton avatar title={false} loading={true} active></Skeleton>
            <Skeleton avatar title={false} loading={true} active></Skeleton>
        </Flex>
    );
};

export default ContactSkeletons;