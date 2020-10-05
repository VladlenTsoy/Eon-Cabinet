import React from "react";
import {CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {Typography} from "antd";
import styled from "styled-components";
import moment from "moment";
import {useLanguage} from "../../../../../../../../../../../../../../hooks/use-language"

const {Text} = Typography;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 576px) {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr;
    margin-left: 1rem;
  }
  
  .lead-time-title {
    display: flex;
    align-self: center;

    .success{
      color: ${props => props.theme.color_success};
    }
    
    .danger{
      color: ${props => props.theme.color_danger};
    }
    
    .warning{
      color: ${props => props.theme.color_warning};
    }

    .anticon{
      font-size: 20px;
      margin-right: 0.5rem;
    }
  }

  .title{
    font-size: 18px;
  }
`;

interface HeaderCollapseHomeworkProps {
    task: any;
}

const Header: React.FC<HeaderCollapseHomeworkProps> = ({task}) => {
    const {l} = useLanguage()

    const updateName = (_task: any) => {
        const title = l('taskNames')[_task.task.discipline_id][_task.task.title]
        switch (Number(_task.task_id)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 23:
            case 24:
                return title + ` (${_task.settings.anzan === 'double' ? 'Двойной' : _task.settings.anzan === 'turbo' ? 'Турбо' : _task.settings.anzan === 'list' ? 'Листы' : 'Обычный'})`;
        }
        return title
    };

    return <HeaderWrapper>
        <div className="lead-time-title">
            {
                !task.first ?
                    <ClockCircleOutlined className="warning"/> :
                    task.first.exodus ?
                        <CheckCircleOutlined className="success"/> :
                        <CloseCircleOutlined className="danger"/>
            }
            {task.first ? moment(task.first.created_at).format('HH:mm DD/MM/YY') : 'Не выполнил'}
        </div>
        <div className="title">
            {updateName(task)}
        </div>
        <div>
            <Text type="secondary">Всего:</Text> {task.count_all}
            <Text type="secondary"> \ Выполнено:</Text> {task.first ? task.first.count_success : 0}
        </div>
    </HeaderWrapper>
};

export default Header;