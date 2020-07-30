import React from 'react';
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import CoinModal from "./CoinModal";

const CoinNotification = () => {
    const [, coins] = useApiUserGeneral({url: '/student/coins', initValue: []});

    return <>
        {coins.map((coin: any, key: string) =>
            <CoinModal key={key} coin={coin}/>
        )}
    </>;
};

export default CoinNotification;