import React from 'react';
import {CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import styled from "styled-components";
import moment from "moment";
import {StudentHomeworkTask} from "../../../../../../../../../../../store/access/teacher/students/studentsSlice";

interface ColumnTask {
    task: StudentHomeworkTask;
}

const WrapperTaskLeadTime = styled.div`
  > div {
      font-size: 14px;
      margin-bottom: 0.5rem;

      .anticon {
          margin-right: 0.2rem;
      }
  }
`;

const WrapperTaskDescription = styled.p`
     margin: 0;
     //font-size: 15px;

     b {
        color: ${props => props.theme.color_black};
        margin-right: 0.5rem;
        font-size: 16px;
     }
`;

const ColumnTask: React.FC<ColumnTask> = ({task}) => {
    return (
        <td>
            <WrapperTaskLeadTime>
                {task.first ?
                    (
                        task.first.exodus ?
                            <div>
                                <CheckCircleOutlined className="success"/>
                                {moment(task.first.created_at).format('DD/MM/YY')}
                            </div> :
                            <div>
                                <ExclamationCircleOutlined className="danger"/>
                                {moment(task.first.created_at).format('DD/MM/YY')}
                            </div>
                    ) :
                    <div>
                        <ClockCircleOutlined className="warning"/>
                        Не выполнено
                    </div>
                }
                <WrapperTaskDescription>
                    <b>{task.task_name}:</b>
                    {task?.first?.count_success || 0} / {task.count_all}
                </WrapperTaskDescription>
            </WrapperTaskLeadTime>
        </td>
    );
};

export default ColumnTask;