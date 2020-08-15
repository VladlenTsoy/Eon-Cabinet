import React from 'react';
import moment from "moment";
import {StopOutlined} from '@ant-design/icons';
import {Modal} from "antd";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {cancelStudentHomework} from "../../../../../../../../../../../store/access/teacher/students/homework/cancelStudentHomework";
import {fetchStudentsHomework} from "../../../../../../../../../../../store/access/teacher/students/homework/fetchStudentsHomework";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../../../Group";

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

  .anticon {
    margin-right: 0.25rem;
  }

  .cancel-text {
     font-size: 12px;
  }
`;

interface TitleProps {
    homework: any;
}

const Title: React.FC<TitleProps> = ({homework}) => {
    const {id} = useParams<ParamsProps>();
    const dispatch = useDispatch();

    const cancelHomeworkHandler = () => {
        Modal.confirm({
            title: `Отменить отправку домашнего задания (Уровень: ${homework.level}) ?`,
            async onOk() {
                await dispatch(cancelStudentHomework(homework.id));
                await dispatch(fetchStudentsHomework({groupId: Number(id), force: true}));
            }
        });
    };

    return (
        <WrapperTitleLevel>
            Уровень:<span
            className="level">{homework.level}</span>({moment(homework.created_at).format('DD/MM/YY')})
            {homework.status === 0 ?
                <WrapperCancelHomework onClick={cancelHomeworkHandler}>
                    <StopOutlined/> <span className="cancel-text">Отменить отправку</span>
                </WrapperCancelHomework> :
                null}
        </WrapperTitleLevel>
    );
};

export default Title;