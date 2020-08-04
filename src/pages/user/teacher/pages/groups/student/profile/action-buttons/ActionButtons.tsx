import React from 'react';
import { DeleteOutlined, DollarOutlined, EditOutlined } from '@ant-design/icons';
import styled from "styled-components";
import ItemBlock from "../../../../../../director-franchise/layouts/items/ItemBlock";
import EditorButton from "../../../more/nav-buttons/editor-button/EditorButton";
import DeleteButton from "./delete-button/DeleteButton";

const ActionsWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  height: 100%;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }

`;

interface ButtonProps {
    disabled?: boolean;
}

const ButtonWrapper: React.FC<ButtonProps> = styled.div<ButtonProps>`
  > div, > span {
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px dashed ${props => props.theme.light_color_border};
    cursor: pointer;
    color: ${props => props.disabled ? props.theme.color_minimal : props.theme.color_second};
    transition: all 0.5s ease-in-out;
    pointer-events: ${props => props.disabled ? 'none' : 'all'};;
  
    :hover{
      color: ${props => props.disabled ? props.theme.color_minimal : props.theme.color_main};
      border: 0;
      //background: ${props => props.theme.light_color_border};
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
      
      span{
        animation-duration: 1s;
        animation-fill-mode: both;
        
        &.anticon-edit{
          animation-name: jello;
          color: ${props => props.theme.color_primary};
        }
                
        &.anticon-delete{
          animation-name: wobble;
          color: ${props => props.theme.color_danger};
        }
               
        &.anticon-lock, &.anticon-unlock{
          animation-name: swing;
          color: ${props => props.theme.color_warning};
        }
        
        &.anticon-dollar{
          animation-name: heartBeat;
          color: ${props => props.theme.color_success};
        }
      }
    }
    
    span.anticon{
      font-size: 30px;
      margin-bottom: 0.5rem;
    }
  }
`;

interface ActionButtonsProps {
    update: () => void;
    student: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({student, update}) => {
    return (
      <ActionsWrapper>
          <ButtonWrapper>
              <EditorButton title="Редактировать ученика" student={student}>
                  <EditOutlined /> Редактировать
              </EditorButton>
          </ButtonWrapper>
          <ButtonWrapper>
              <ItemBlock user={student} afterAction={update}/>
          </ButtonWrapper>
          <ButtonWrapper disabled>
              <span>
                  <DollarOutlined />
                  Оплатить
              </span>
          </ButtonWrapper>
          <ButtonWrapper>
              <DeleteButton student={student} fetch={update}>
                  <DeleteOutlined />
                  Удалить
              </DeleteButton>
          </ButtonWrapper>
      </ActionsWrapper>
    );
};

export default ActionButtons;