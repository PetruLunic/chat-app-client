import React, {FC, memo} from 'react';
import {Flex, Skeleton} from "antd";

const ChatMessageSkeletons: FC = () => {
    const skeletons = Array.from({ length: 7 }, () => Math.round(Math.random()));

    return (
        <Flex gap='middle' vertical>
            {skeletons.map((item, index) =>
                item
                    ? <Skeleton.Button
                        key={index}
                        style={{width: "200px", height: "60px", borderRadius: "0 15px 15px"}}
                        active
                     />
                    : <Skeleton.Button
                        key={index}
                        style={{width: "200px", height: "60px", borderRadius: "15px 0 15px 15px",float: 'right', marginRight: "10px"}}
                        active
                    />
            )}
        </Flex>
    );
};

export default memo(ChatMessageSkeletons);