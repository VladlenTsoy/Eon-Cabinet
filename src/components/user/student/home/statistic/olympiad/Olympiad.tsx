import React from 'react';
import {CardStatistic} from "lib";
import {TrophyOutlined} from "@ant-design/icons";

const Olympiad = () => {
    return <CardStatistic
            title="Олимпиада"
            theme="warning"
            icon={<TrophyOutlined/>}
            loading={false}
            count={10}
            items={[
                {title: 'Выполенных', count: 0, type: 'warning'},
            ]}
        />;
};

export default Olympiad;