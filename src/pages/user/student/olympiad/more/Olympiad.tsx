import React from 'react';
import {RouteComponentProps} from "react-router-dom";
import styled from "styled-components";
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {LoadingBlock} from "lib/ui";
import {Typography} from "antd";
import {useChangeActionNavbar} from "hooks/use-change-action-navbar.effect";
import {useChangeTitle} from "hooks/use-change-title.effect";
import Steps from "./steps/Steps";
import Info from "./info/Info";

const {Title} = Typography;

const OlympiadWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1.5rem;
  background: ${props => props.theme['@component-background']};
  
  h1{
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }  
  
  @media (max-width: 576px) {
    padding: 1.5rem .5rem;
  }
`;

interface MatchProps {
    olympiadId?: string;
}

type OlympiadProps = RouteComponentProps<MatchProps>;

/**
 *
 * @param match
 * @constructor
 */
const Olympiad: React.FC<OlympiadProps> = ({match}) => {
    const [loading, olympiad] = useApiUserGeneral({url: `/student/olympiad/${match.params.olympiadId}`});

    useChangeTitle({title: `Олимпиада: ${loading ? 'Загрузка...' : olympiad.title}`});
    useChangeActionNavbar({action: '/olympiads'});

    if (loading)
        return <LoadingBlock/>;

    return <OlympiadWrapper>
        <Title level={1}>{olympiad.title}</Title>
        <Info olympiad={olympiad}/>
        <Steps olympiad={olympiad}/>
    </OlympiadWrapper>;
};

export default Olympiad;