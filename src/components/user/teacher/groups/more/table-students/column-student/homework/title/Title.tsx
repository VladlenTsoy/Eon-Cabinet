import React from 'react';
import moment from "moment";
import { StopOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";

const WrapperTitleLevel = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
  color: ${props => props.theme.color_second};
  margin-right: 0.5rem;

  .level{
    font-weight: 900;
    color: ${props => props.theme.color_primary};
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
`;

const WrapperCancelHomework = styled.span`
  color: ${props => props.theme.color_danger};
  display: inline-flex;
  align-items: center;
  margin: 0 0 0 .4rem;
  font-size: 14px;
  cursor: pointer;

  i {
    margin-right: 0.25rem;
  }

  span {
     font-size: 12px;
  }
`;

interface TitleProps {
    homework: any;
    fetch: () => void;
}

const Title:React.FC<TitleProps> = ({homework, fetch}) => {
    const {api} = useSelector((state: any) => state);

    const cancelHomeworkHandler = () => {
        Modal.confirm({
            title: `Отменить отправку домашнего задания (Уровень: ${homework.level}) ?`,
            async onOk() {
                await api.user_general.post('teacher/homework/cancel', {sent_id: homework.id});
                await fetch();
            }
        });
    };

    return (
        <WrapperTitleLevel>
            Уровень:<span
            className="level">{homework.level}</span>({moment(homework.created_at).format('DD/MM/YY')})
            {homework.status === 0 ?
                <WrapperCancelHomework onClick={cancelHomeworkHandler}>
                    <StopOutlined /> <span>Отменить отправку</span>
                </WrapperCancelHomework> :
                null}
        </WrapperTitleLevel>
    );
};

export default Title;