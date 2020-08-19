import React from "react";
import {Link} from "react-router-dom";
import {FlagOutlined} from '@ant-design/icons';
import {Typography} from "antd";
import {Card} from "lib/ui";
import styled from "styled-components";
import {Task} from "../../../../../../../lib/types/teacher/Task";

const {Title} = Typography;

const TaskCardWrapper: any = styled(Card)`
  margin-bottom: 1rem;
  opacity: ${(props: any) => props.block ? 0.5 : 1};
  
  .ant-card-body {
    align-items: center;
    display: flex;

    .image-block {
      width: 80px;
      height: 80px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    .container-block {
      margin-left: 1.5rem;
      width: calc(100% - 80px);

      a {
        .anticon {
          margin-right: 0.5rem;
        }
      }
    }
  }
`;

interface TaskBlockProps {
    task: Task;
}

const TaskBlock: React.FC<TaskBlockProps> = ({task}) => {
    return <TaskCardWrapper block={task.block}>
        <div className="image-block">
            <img src={task.image} alt={task.title}/>
        </div>
        <div className="container-block">
            <Title level={4}>{task.title}</Title>
            <Link to={`/training/${task.discipline_id}/${task.id}/setting`}>
                <FlagOutlined/>
                Начать
            </Link>
        </div>
    </TaskCardWrapper>;
};

export default TaskBlock;