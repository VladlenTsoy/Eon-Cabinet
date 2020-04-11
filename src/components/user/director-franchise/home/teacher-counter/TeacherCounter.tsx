import React from "react";
import {useSelector} from "react-redux";
import {CardStatistic} from "../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";

const TeacherCounter: React.FC<any> = () => {
    const {user} = useSelector((state: any) => (state));
    const [loading, counter] = useApiUserGeneral({url: `/${user.access}/teacher-counter`});

    return <CardStatistic
        title="Учителя"
        theme="warning"
        icon="team"
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