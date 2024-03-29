import React from 'react';
import MultiGridLayout from "../layouts/MultiGrid.layout";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Card} from "lib";
import UserResult from "./user-result/UserResult";
import Header from "./header/Header";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const ResultWrapper = styled(Card)`
  &.ant-card{
    margin-bottom: 0;
    height: 100%;
    
    .ant-card-body{
      height: 100%;
    }
  }
`;

const BodyWrapper = styled.div`
  height: calc(100% - 65px);
  margin-right: 0;
  margin-left: 0;
`;

const Result: React.FC = () => {
    const {currentTimes, setting, totals} = useSelector(gameSelector);

    return <ResultWrapper>
        <Header/>
        <BodyWrapper>
            <MultiGridLayout
                gridGap={1}
                gridGapType="px"
                background="@background-color-base"
                length={(setting.group ? totals : totals[currentTimes]).exercise.length}
            >
                {(setting.group ? totals : totals[currentTimes])
                    .result.map((result: boolean, key: number) =>
                        <UserResult
                            key={key}
                            taskKey={key}
                            result={result}
                        />
                    )
                }
            </MultiGridLayout>
        </BodyWrapper>
    </ResultWrapper>;
};

export default Result;