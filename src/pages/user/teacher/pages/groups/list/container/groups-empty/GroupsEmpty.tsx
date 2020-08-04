import React from 'react';
import {DescriptionTitle} from "lib/components";
import {Button, Empty} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import EditorButton from "../../nav-buttons/editor-button/EditorButton";

const GroupsEmpty = () => {
    return <Empty
        description={
            <>
                <DescriptionTitle>Пусто</DescriptionTitle>
                <span>Создайте группу для добавление учеников</span>
            </>
        }
    >
        <EditorButton title="Создать группу">
            <Button type="ghost" size="large" icon={<PlusOutlined/>}>
                Создать Группу
            </Button>
        </EditorButton>
    </Empty>;
};

export default GroupsEmpty;