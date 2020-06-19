import React from 'react';
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {LoadingBlock} from "lib";
import Currents from "./currents/Currents";
import Pasts from "./pasts/Pasts";
import Futures from "./futures/Futures";

interface OlympiadsProps {
    keyFetch: string;
    disciplineId: any;
}

const Olympiads: React.FC<OlympiadsProps> = ({keyFetch, disciplineId}) => {
    const [loading, olympiads] = useApiUserGeneral({
        url: `/teacher/olympiads/${disciplineId}/${keyFetch}`,
        initValue: []
    });

    if (loading)
        return <LoadingBlock/>

    return <>
        {keyFetch === 'current' && <Currents olympiads={olympiads}/>}
        {keyFetch === 'past' && <Pasts olympiads={olympiads.data}/>}
        {keyFetch === 'future' && <Futures olympiads={olympiads.data}/>}
    </>;
};

export default Olympiads;