import React from 'react';
import {Legend} from "../../../../../lib";
import {LoadingBlock} from "lib";
import OlympiadEmpty from "./olympiad-empty/OlympiadEmpty";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";

const Olympiad: React.FC = () => {
    const [loading, olympiads,] = useApiUserGeneral({
        url: 'student/olympiads/active',
        config: {params: {limit: 3}},
        initValue: [],
    });

    if (loading)
        return <LoadingBlock/>;

    if (!olympiads.length)
        return <OlympiadEmpty/>;

    return <>
        <Legend styled={{marginTop: 0}}>Олимпиады</Legend>

    </>
};

export default Olympiad;