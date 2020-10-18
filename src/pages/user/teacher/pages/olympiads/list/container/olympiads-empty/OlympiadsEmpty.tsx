import React from 'react';
import {Button, Empty} from "../../../../../../../../lib/ui";
import {PlusOutlined} from "@ant-design/icons";

const OlympiadsEmpty = () => {
    return <Empty
        title="Пусто"
        description={"Нет сохраненных олимпиад"}
    >
        <Button type="ghost" size="large" to="/olympiad/create" icon={<PlusOutlined/>}>
            Создать олимпиаду
        </Button>
    </Empty>;
};

export default React.memo(OlympiadsEmpty);