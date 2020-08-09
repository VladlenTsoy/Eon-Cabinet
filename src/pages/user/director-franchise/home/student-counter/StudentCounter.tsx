import React from "react";
import {TeamOutlined} from "@ant-design/icons";
import {CardStatistic} from "../../../../../lib/components";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";
import {useUser} from "../../../../../hooks/use-user";

const StudentCounter: React.FC<any> = () => {
    const {user} = useUser();
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