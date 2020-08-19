import React from 'react';
import {ButtonLink, DescriptionTitle} from "../../../../../../../../lib/ui";
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
        <ButtonLink type="ghost" size="large" to="/olympiad/create" icon={<PlusOutlined/>}>
            Создать олимпиаду
        </ButtonLink>
    </Empty>;
};

export default React.memo(OlympiadsEmpty);