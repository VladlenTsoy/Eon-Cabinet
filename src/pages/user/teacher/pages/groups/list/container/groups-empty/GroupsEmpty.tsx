import React from 'react';
import {DescriptionTitle} from "lib/ui";
import {Empty} from "antd";

const GroupsEmpty = () => {
    return <Empty
        description={
            <>
                <DescriptionTitle>Пусто</DescriptionTitle>
                <span>Создайте группу для добавление учеников</span>
            </>
        }
    >
    </Empty>;
};

export default GroupsEmpty;