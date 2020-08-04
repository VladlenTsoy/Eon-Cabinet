import React from 'react';
import styled from "styled-components";
import SideBlockLayout from "../../../../../../../../../lib/layouts/result/layouts/side-block/SideBlock.layout";
import NextTask from "./next-task/NextTask";
import NextStep from "./next-step/NextStep";
import CounterTasks from "./counter-tasks/CounterTasks";

const RightBlockLayout = styled(SideBlockLayout)`
  order: 3;
  
  @media (max-width: 992px) {
    order: 3;
  }  
  
  @media (max-width: 576px) {
    order: 2;
  }
`;

interface RightBlockProps {
    loading: boolean;
    resultData: any;
}

const RightBlock: React.FC<RightBlockProps> = ({loading, resultData}) => {
    return <RightBlockLayout>
        <NextStep loading={loading} resultData={resultData}/>
        <CounterTasks loading={loading} resultData={resultData}/>
        {!loading && resultData && resultData.next_task ?
            <NextTask loading={loading} nextTask={resultData.next_task}/> : null}
    </RightBlockLayout>;
};

export default React.memo(RightBlock);