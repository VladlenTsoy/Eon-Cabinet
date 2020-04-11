import React from 'react';
import {Legend} from "../../../../../layouts/components";
import {LoadingBlock} from "lib";
import OlympiadEmpty from "./olympiad-empty/OlympiadEmpty";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";
import CardOlympiad from "./card-olympiad/CardOlympiad";
import styled from "styled-components";

const OlympiadWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Olympiad: React.FC = () => {
    const [loading, olympiads, , fetch] = useApiUserGeneral({
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
        <OlympiadWrapper>
            {
                olympiads.map((olympiad: any, key: number) =>
                    <CardOlympiad olympiad={olympiad} key={key} fetch={fetch}/>
                )
            }
        </OlympiadWrapper>
    </>
};

export default Olympiad;