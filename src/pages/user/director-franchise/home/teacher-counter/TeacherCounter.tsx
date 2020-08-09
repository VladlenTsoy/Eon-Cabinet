import React from "react";
import {CardStatistic} from "../../../../../lib/components";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";
import {TeamOutlined} from "@ant-design/icons";
import {useUser} from "../../../../../hooks/use-user";

const TeacherCounter: React.FC<any> = () => {
    const {user} = useUser();
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