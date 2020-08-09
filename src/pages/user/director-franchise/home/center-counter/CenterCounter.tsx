import React from 'react';
import {BankOutlined} from "@ant-design/icons";
import {CardStatistic} from "../../../../../lib/components";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";
import {useUser} from "../../../../../hooks/use-user";

const CenterCounter: React.FC<any> = () => {
    const {user} = useUser();
    const [loading, counter] = useApiUserGeneral({url: `/${user.access}/center-counter`});

    return <CardStatistic
        title="Центры"
        theme="success"
        icon={<BankOutlined/>}
        loading={loading}
        count={counter ? counter.all : 0}
        activeTitle="Открытых"
        active={counter ? counter.active : 0}
    />;
};

export default CenterCounter;