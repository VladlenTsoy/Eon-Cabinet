import React from 'react';
import {EditOutlined, DeleteOutlined, CopyOutlined, InfoCircleOutlined, MenuOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../../../../../effects/use-screen-window.effect";
import {Button} from "antd";
import MoreHomeworkDrawer from "./more-homework/MoreHomeworkDrawer";
import {ModalMenu} from "lib";
import {Link} from "react-router-dom";
import DeleteHomework from "./delete/DeleteHomework";

const ActionStyled = styled.div`
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.color_second};
  text-align: center;
  transition: all 0.3s ease-in-out;
  
  :hover{
   color: ${props => props.theme.color_primary};
  }
   
  span{
    display: block;
  }
  
  .anticon{
    font-size: 40px;
    margin-bottom: 0.5rem;
  }
  
  .title{
    overflow: hidden;
    text-overflow: ellipsis;
  }
 
  @media (max-width: 1600px) {
    .anticon{
      font-size: 30px;
    }
    
    .title{
      font-size: 14px;
    }
  }
  
  @media (max-width: 1200px) {
    padding: 0;

    .title{
      display: none;
    }
  }
`;

interface ActionsProps {
    homework: any;
    fetch: any;
}

const Actions: React.FC<ActionsProps> = ({homework, fetch}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'lg'});

    if (isBreakpoint)
        return <ModalMenu button={<Button icon={<MenuOutlined/>} type="ghost" shape="circle" size="large"/>}>
            <MoreHomeworkDrawer homework={homework}>
                <InfoCircleOutlined/> Подробнее
            </MoreHomeworkDrawer>
            <Link to={`/homework/${homework.id}`}>
                <EditOutlined/> Редактировать
            </Link>
            <Link to={`/homework/${homework.id}/duplicate`}>
                <CopyOutlined/> Дублировать
            </Link>
            <DeleteHomework homework={homework} fetch={fetch}>
                <DeleteOutlined/> Удалить
            </DeleteHomework>
        </ModalMenu>

    return <>
        <MoreHomeworkDrawer homework={homework}>
            <ActionStyled>
                <InfoCircleOutlined/>
                <span className="title">Подробнее</span>
            </ActionStyled>
        </MoreHomeworkDrawer>
        {/*<ActionStyled>*/}
        {/*    <SendOutlined/>*/}
        {/*    <span className="title">Отправить</span>*/}
        {/*</ActionStyled>*/}
        <Link to={`/homework/${homework.id}`}>
            <ActionStyled>
                <EditOutlined/>
                <span className="title">Редактировать</span>
            </ActionStyled>
        </Link>
        <Link to={`/homework/${homework.id}/duplicate`}>
            <ActionStyled>
                <CopyOutlined/>
                <span className="title">Дублировать</span>
            </ActionStyled>
        </Link>
        <DeleteHomework homework={homework} fetch={fetch}>
            <ActionStyled>
                <DeleteOutlined/>
                <span className="title">Удалить</span>
            </ActionStyled>
        </DeleteHomework>
    </>;
};

export default Actions;