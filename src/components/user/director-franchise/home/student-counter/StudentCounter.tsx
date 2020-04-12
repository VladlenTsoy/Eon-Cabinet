import React from "react";
import {useSelector} from "react-redux";
import {TeamOutlined} from "@ant-design/icons";
import {CardStatistic} from "../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";

const StudentCounter: React.FC<any> = () => {
    const {user} = useSelector((state: any) => (state));
    const [loading, counter] = useApiUserGeneral({url: `/${user.access}/student-counter`});

    return <CardStatistic
        title="Ученики"
        theme="primary"
        icon={<TeamOutlined/>}
        loading={loading}
        count={counter ? counter.all : 0}
        items={[
            {title: 'Открытых', count: counter ? counter.open : 0, type: 'primary'},
            {title: 'Активных', count: counter ? counter.active : 0},
        ]}
    />;
};

export default StudentCounter;