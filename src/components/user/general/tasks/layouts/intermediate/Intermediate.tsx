import React, {useCallback} from 'react';
import {Col, Row} from "antd";
import ResultIntermediate from "./result-intermediate/ResultIntermediate";
import ActionIntermediate from "./action-intermediate/ActionIntermediate";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Card} from "lib";
import StepsIntermediate from "./layouts/step-intermediate/StepsIntermediate";
import BgIconsDownIntermediateLayout from "./layouts/bg-icons-down/BgIconsDownIntermediate.layout";

const CardWrapper = styled(Card)`
  &.ant-card{
    min-height: 100%;
    margin: 0;
    overflow: hidden;
    
    .ant-card-body{
      min-height: 100%;    
      
      .ant-col{
        z-index: 5;
      }
    }
  }
`;

const RowWrapper = styled(Row)`
  min-height: 100%;
`;

const Intermediate: React.FC = ({children}) => {
    const {game} = useSelector((state: any) => state);
    const {setting, currentTimes, totals} = game;

    const checkResult = useCallback((total: any) => {
        if (setting.anzan === 'double')
            return total[0].result === total[1].result;
        else
            return total.result;
    }, [setting]);

    return <CardWrapper>
        <StepsIntermediate checkResult={checkResult}/>
        <RowWrapper  justify="center" align="middle" gutter={15}>
            {!(setting.extra && setting.extra.includes('group')) ?
                <Col xl={7}>
                    {children}
                </Col> : null}
            {!(setting.extra && setting.extra.includes('group')) ?
                <Col xl={10} style={{position: 'unset'}}>
                    <ResultIntermediate checkResult={checkResult} total={totals[currentTimes]}/>
                </Col> : null}
            <Col xl={7}>
                <ActionIntermediate/>
            </Col>
        </RowWrapper>
        <BgIconsDownIntermediateLayout/>
    </CardWrapper>;
};

export default Intermediate;