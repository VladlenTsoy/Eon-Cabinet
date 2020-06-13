import React from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {LoadingBlock} from "lib";
import Currents from "./currents/Currents";

interface OlympiadsProps {
    keyFetch: string;
}

const Olympiads: React.FC<OlympiadsProps> = ({keyFetch}) => {
    const [loading, olympiads] = useApiUserGeneral({url: `/teacher/olympiads/${keyFetch}`, initValue: []});

    if (loading)
        return <LoadingBlock/>

    return <>
        {keyFetch === 'current' && <Currents olympiads={olympiads}/>}
    </>;
};

export default Olympiads;