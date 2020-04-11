import React from 'react';
import {useSelector} from "react-redux";
import {CardStatistic} from "../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";

const CenterCounter: React.FC<any> = () => {
    const {user} = useSelector((state: any) => (state));
    const [loading, counter] = useApiUserGeneral({url: `/${user.access}/center-counter`});

    return <CardStatistic
        title="Центры"
        theme="success"
        icon="bank"
        loading={loading}
        count={counter ? counter.all : 0}
        activeTitle="Открытых"
        active={counter ? counter.active : 0}
    />;
};

export default CenterCounter;