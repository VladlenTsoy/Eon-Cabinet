import React from 'react';
import {Button, Empty} from "lib/ui";
import {PlusOutlined} from "@ant-design/icons";

const HomeworkEmpty = () => {
    return <Empty
        title="Пусто"
        description="Нет сохраненных домашних заданий"
    >
        <Button type="ghost" size="large" to="/homework/create" icon={<PlusOutlined/>}>
            Создать домашнее задание
        </Button>
    </Empty>;
};

export default React.memo(HomeworkEmpty);