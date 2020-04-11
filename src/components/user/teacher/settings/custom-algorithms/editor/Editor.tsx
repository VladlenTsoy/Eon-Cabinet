import React, {useCallback, useState} from 'react';
import {Steps} from "antd";
import {Card} from "lib";
import StepSetting from "./step-setting/StepSetting";
import styled from "styled-components";
import StepAlgorithm from "./step-algorithm/StepAlgorithm";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";

const {Step} = Steps;

const StepsWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Editor: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [setting, setSetting] = useState();

    useChangeActionNavbar({action: 'back'});

    const settingSave = useCallback((setting: any) => {
        setSetting(setting);
        setCurrent(1);
    }, []);

    return <>
        <Card>
            <StepsWrapper>
                <Steps current={current}>
                    <Step title="Настройка"/>
                    <Step title="Алгоритмы"/>
                </Steps>
            </StepsWrapper>
            {current === 0 ? <StepSetting key={current} settingSave={settingSave}/> : null}
            {current === 1 && setting ? <StepAlgorithm key={current} setting={setting}/> : null}
        </Card>
    </>
};

export default Editor;