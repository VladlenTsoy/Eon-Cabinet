import React from "react";
import {CardStatistic} from "../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";
import {TeamOutlined} from "@ant-design/icons";
import {useAppContext} from "../../../../../store/context/use-app-context";

const TeacherCounter: React.FC<any> = () => {
    const {user} = useAppContext();
    const [loading, counter] = useApiUserGeneral({url: `/${user.access}/teacher-counter`});

    return <CardStatistic
        title="Учителя"
        theme="warning"
        icon={<TeamOutlined/>}
        loading={loading}
        count={counter ? counter.all : 0}
        items={[
            {title: 'Открытых', count: counter ? counter.open : 0, type: 'warning'},
            {title: 'Активных', count: counter ? counter.active : 0},
            {title: 'Тестовых', count: counter ? counter.test : 0},
        ]}
    />;
};

export default TeacherCounter;