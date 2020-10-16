import React from 'react';
import {Button, DescriptionTitle} from "../../../../../../../../lib/ui";
import {Empty} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const HomeworkEmpty = () => {
    return <Empty
        description={
            <>
                <DescriptionTitle>Пусто</DescriptionTitle>
                <span>Нет сохраненных домашних заданий</span>
            </>
        }
    >
        <Button type="ghost" size="large" to="/homework/create" icon={<PlusOutlined/>}>
            Создать домашнее задание
        </Button>
    </Empty>;
};

export default React.memo(HomeworkEmpty);