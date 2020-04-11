import React, {useState} from "react";
import {Col, Row} from "antd";
import styled from "styled-components";
import Anzan from "./tasks/mental/Anzan";
import Words from "./tasks/mnemonic/Words";
import LeftBlock from "./left-block/LeftBlock";
import DigitalRow from "./tasks/mnemonic/DigitalRow";
import Countries from "./tasks/mnemonic/Countries";
import Personalities from "./tasks/mnemonic/Personalities";
import DigitalPicture from "./tasks/mnemonic/DigitalPicture";
import Numbers from "./tasks/mnemonic/Numbers";
import MasterySystem from "./tasks/mnemonic/MasterySystem";

const RowHomeworkTasksWrapper = styled(Row)`
  .totals-wrapper{
    overflow-y: hidden;
    overflow-x: auto;
    
    table{
      width: 100%;
      white-space: nowrap;

      th{
        border-bottom: 1px solid ${props => props.theme.color_border};
        padding: 0.5rem;
        color: ${props => props.theme.color_second}
      }
    
      tr:not(:last-child){
        border-bottom: 1px solid ${props => props.theme.color_border};
      }
      
      td{
        font-size: 25px;
        padding: 0.5rem;
        line-height: 1;
        
        i{

          &.warning{
            color: ${props => props.theme.color_warning}
          }

          &.secondary{
            color: ${props => props.theme.color_second}
          }
        }    
        
        @media (max-width: 576px) {
          font-size: 16px;
        }
      }
    }
  }
`;

interface TasksProps {
    task: any;
}

const Tasks: React.FC<TasksProps> = ({task}) => {
    const [state, setState] = useState('first');

    const result = (taskId: any) => {
        switch (taskId) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 23:
            case 24:
                return <Anzan totals={task[state].totals}/>;
            case 7:
            case 15:
                return <Words totals={task[state].totals}/>;
            case 10:
                return <DigitalRow totals={task[state].totals}/>;
            case 9:
                return <Countries totals={task[state].totals}/>;
            case 8:
                return <Personalities totals={task[state].totals}/>;
            case 19:
                return <DigitalPicture totals={task[state].totals}/>;
            case 12:
            case 16:
                return <Numbers totals={task[state].totals}/>;
            case 11:
                return <MasterySystem totals={task[state].totals}/>;
        }
    };

    return <RowHomeworkTasksWrapper gutter={15}>
        <Col xl={4} lg={5} md={6} xs={24}>
            <LeftBlock task={task} state={state} setState={setState}/>
        </Col>
        <Col xl={20} lg={19} md={18} xs={24}>
            <div className="totals-wrapper">
                {result(task.task_id)}
            </div>
        </Col>
    </RowHomeworkTasksWrapper>;
};

export default Tasks;