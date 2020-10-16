import React from 'react';
import {Button, DescriptionTitle} from "../../../../../../../../lib/ui";
import {Empty} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const OlympiadsEmpty = () => {
    return <Empty
        description={
            <>
                <DescriptionTitle>Пусто</DescriptionTitle>
                <span>Нет сохраненных олимпиад</span>
            </>
        }
    >
        <Button type="ghost" size="large" to="/olympiad/create" icon={<PlusOutlined/>}>
            Создать олимпиаду
        </Button>
    </Empty>;
};

export default React.memo(OlympiadsEmpty);