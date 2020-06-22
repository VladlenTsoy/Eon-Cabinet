import React from 'react';
import {ButtonLink, DescriptionTitle} from "../../../../../../../../lib";
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
        <ButtonLink type="ghost" size="large" to="/homework/create" icon={<PlusOutlined/>}>
            Создать домашнее задание
        </ButtonLink>
    </Empty>;
};

export default React.memo(HomeworkEmpty);