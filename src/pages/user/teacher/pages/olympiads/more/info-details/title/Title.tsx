import React from 'react';
import { StopOutlined } from '@ant-design/icons';
import {Button, message, Modal, Typography} from "antd";
import styled from "styled-components";
import {useAppContext} from "store/context/use-app-context";
import {withRouter, RouteComponentProps} from "react-router-dom";
import ButtonSaveOlympiad from "../../../editor/steps-setting/actions/save/ButtonSaveOlympiad";

const {Title} = Typography;
const {confirm} = Modal;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  .ant-typography{
    margin-bottom: 0;
    
    > span{
      margin-left: 1rem;
      color: ${props => props.theme.color_second};

      span{
        color: ${props => props.theme.color_warning};
        margin-left: 0.25rem;
      }
    }
  }
  
  .actions{
    > span {
      margin-right: 0.5rem;
    }  
  }
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    
    .ant-typography{
      margin-bottom: 1rem;
    }
  }
`;

type TitleProps = RouteComponentProps & {
    olympiad: any;
    fetch: () => void;
}

const TitleInfo: React.FC<TitleProps> = ({olympiad,fetch, history}) => {
    const {api} = useAppContext();
    const finishOlympiad = () => {
        confirm({
            title: 'Вы уверены что хотите завершить олимпиаду?',
            // content: '',
            okText: 'Да',
            okType: 'danger',
            async onOk() {
                const response = await api.user.delete(`teacher/olympiad/${olympiad.id}`);
                if (response.data.status === 'success') {
                    history.push('/olympiad');
                    message.success('Вы успешно завершили олипиаду!')
                }
                console.log('OK');
            },
        });
    };

    return (
        <TitleWrapper>
            <Title level={3}>
                {olympiad.title}
                <span>
                    ID:
                    <span>{olympiad.id}</span>
                </span>
            </Title>
            <div className="actions">
                <ButtonSaveOlympiad
                    olympiad={{
                        id: olympiad.id,
                        title: olympiad.title,
                        description: olympiad.description,
                        access: olympiad.access,
                    }}
                    fetch={fetch}
                />
                {
                    Number(olympiad.status) === 0 ?
                        <Button danger icon={<StopOutlined />} ghost onClick={finishOlympiad}>Отменить олимпиаду</Button> : null
                }
            </div>
        </TitleWrapper>
    );
};

export default withRouter(TitleInfo);