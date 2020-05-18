import React from 'react';
import styled from "styled-components";
import {Card} from "lib";
import MultiGridLayout from "../layouts/MultiGrid.layout";
import {useSelector} from "react-redux";
import Header from "./header/Header";
import UserIntermediate from "./user-intermediate/UserIntermediate";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import {game} from "../../../../../../../store/game/reducer";

const IntermediateWrapper = styled(Card)`
  &.ant-card{
     height: 100%;
     margin-bottom: 0;
     
    .ant-card-body{
      height: 100%;
    }
  }
`;

const Intermediate: React.FC = () => {
    const {currentTimes} = useSelector(game);
    const totals: any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);

    return <IntermediateWrapper>
        <Header/>
        <MultiGridLayout
            height={`calc(100% - 65px)`}
            background="@background-color-base"
            gridGap={1}
            gridGapType="px"
            length={(setting.group ? totals : totals[currentTimes]).exercise.length}
        >
            {(setting.group ? totals : totals[currentTimes])
                .result.map((result: any, key: number) =>
                    <UserIntermediate
                        isWait={!setting.group && setting.windows[key].times < currentTimes}
                        key={key}
                        keyTask={key}
                        result={result}
                    />
                )}
        </MultiGridLayout>
    </IntermediateWrapper>;
};

export default Intermediate;