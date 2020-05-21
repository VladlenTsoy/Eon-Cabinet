import React, {useEffect} from 'react';
import {appChangeTitleNavbar} from "store/app/actions";
import {useDispatch} from "react-redux";
import InfoDetails from "./info-details/InfoDetails";
import {LoadingBlock} from "lib";
import {Result} from "antd";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import StepsDetails from "./step-details/StepsDetails";
import styled from "styled-components";
import StudentDetails from "./student-details/StudentDetails";
import {Spin} from "layouts/components";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";

const MoreWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme['@component-background']};
  padding: 1.5rem;
  overflow-x: hidden;
  overflow-y: auto;
  
  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

interface MoreOlympiadProps {
    match: any;
}

const MoreOlympiad: React.FC<MoreOlympiadProps> = ({match}) => {
    const [loading, olympiad, error, fetch] = useApiUserGeneral({url: `teacher/olympiad/${match.params.id}`});
    const dispatch = useDispatch();

    useChangeActionNavbar({action: 'back'});

    useEffect(() => {
        if (match.params.id)
            dispatch(appChangeTitleNavbar(loading ? 'Загрузка...' : `Олимпиада: ${olympiad ? olympiad.title : 'Недоступна'}`));
    }, [loading, dispatch, match.params.id, olympiad]);

    if (loading && !olympiad)
        return <LoadingBlock/>;

    if (error)
        return <Result
            status="error"
            title="Нет доступа!"
            subTitle={error.message}
        />;

    return <MoreWrapper className="fadeIn animated">
        <Spin tip="Загрузка..." spinning={loading}>
            <InfoDetails olympiad={olympiad} fetch={fetch}/>
            <StudentDetails olympiad={olympiad} fetch={fetch}/>
            <StepsDetails olympiad={olympiad} key={loading ? 'loading' : ''}/>
        </Spin>
    </MoreWrapper>
};

export default MoreOlympiad;