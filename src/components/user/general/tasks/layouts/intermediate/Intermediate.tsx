import React, {useCallback, useEffect} from 'react';
import {Col, Row} from "antd";
import ResultIntermediate from "./result-intermediate/ResultIntermediate";
import ActionIntermediate from "./action-intermediate/ActionIntermediate";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Card} from "lib";
import StepsIntermediate from "./layouts/step-intermediate/StepsIntermediate";
import BgIconsDownIntermediateLayout from "./layouts/bg-icons-down/BgIconsDownIntermediate.layout";
import {useScreenWindow} from "../../../../../../effects/use-screen-window.effect";
import {game} from "../../../../../../store/reducers/common/game/reducer";
import {totalsSelect} from "../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../store/tasks/setting/reducer";

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
    const {currentTimes} = useSelector(game);
    const totals = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const checkResult = useCallback((total: any) => {
        if (total) {
            if (setting.anzan === 'double')
                return total[0].result && total[1].result;
            else if (total?.result)
                return total.result;
        }
    }, [setting]);

    useEffect(() => {
        document.getElementsByClassName('ant-layout-content')[0].scrollTo(0, 0);
    }, []);

    return <CardWrapper>
        {!isBreakpoint && !setting.extra.includes('group') && <StepsIntermediate checkResult={checkResult}/>}
        <RowWrapper justify="center" align="middle" gutter={15}>
            {!(setting.extra && setting.extra.includes('group')) &&
            <Col lg={{span: 7, order: 1}} xs={{span: 24, order: 2}}>
                {children}
            </Col>
            }
            {!(setting.extra && setting.extra.includes('group')) &&
            <Col lg={{span: 10, order: 2}} xs={{span: 24, order: 1}} style={{position: 'unset'}}>
                <ResultIntermediate checkResult={checkResult} total={totals[currentTimes]}/>
            </Col>
            }
            <Col lg={{span: 7, order: 3}} xs={{span: 24, order: 3}}>
                <ActionIntermediate checkResult={checkResult}/>
            </Col>
        </RowWrapper>
        <BgIconsDownIntermediateLayout/>
    </CardWrapper>;
};

export default Intermediate;