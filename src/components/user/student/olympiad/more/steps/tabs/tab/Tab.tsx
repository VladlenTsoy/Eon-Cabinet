import React from 'react';
import styled from "styled-components";
import { LockOutlined } from '@ant-design/icons';
import moment from "moment";
import TabImage from "./tab-image/TabImage";

interface TabStyleProps extends React.HTMLAttributes<HTMLDivElement> {

}

const TabWrapper: React.FC<TabStyleProps> = styled.div`
  position: relative;
  padding: 1rem;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 250px;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-gap: 1rem;
  text-align: left;

  &.active{
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    background: ${props => props.theme['@component-background']};
    transform: scale(1.05);
    border-bottom: 5px solid ${props => props.theme.color_warning};
  }
  
  &.disabled{
    cursor: default;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.05);
    
    .sub-title, .title {
      color: ${props => props.theme.color_minimal};
    }
  }
  
  &:not(:last-child){
    margin-right: 1.5rem;
  }
  
  &:hover{
    transform: scale(1.05);
  }

    
  .sub-title{
    color: ${props => props.theme.color_second};  
    position: relative;
    z-index: 5;
    font-size: 14px;
    
    .time{
      font-size: 16px;
    }
    
    .slash{
      margin: 0 0.25rem;
      color: ${props => props.theme.color_minimal};
    }
  } 
  
  .title{
    font-size: 25px;
    position: relative;
    z-index: 5;
    
    i {
      margin-right: 0.5rem;
    }
  }
`;


interface TabProps {
    step: any;
    selectStep: any;
    currentStep: any;
    clickHandler: (id: any) => void;
}

const Tab: React.FC<TabProps> = ({step, selectStep, currentStep, clickHandler}) => {
    const momentFormatCheckYear = (date: any, formatOne: string, formatTwo: string) => {
        const years = moment(date).diff(date, 'years', false);
        return moment(date).format(years ? formatTwo : formatOne);
    };

    return (
      <TabWrapper
          className={
              step.id === selectStep.id ?
                  'active' : step.step > currentStep.step ?
                  'disabled' : ''
          }
          onClick={() => clickHandler(step)}
      >
          <TabImage percent={(step.count_success / step.count_all * 100)}/>
          <div className="content">
              <div className="sub-title">
                  <span className="time">{(moment(step.start_at).format('HH:mm'))}</span>
                  <span className="slash">/</span>
                  {momentFormatCheckYear(step.start_at, 'DD MMMM', 'DD-MM-YY')}
              </div>
              <div className="title">
                  {step.step > currentStep.step ? <LockOutlined /> : null}
                  Этап #{step.step + 1}
              </div>
          </div>
      </TabWrapper>
    );
};

export default Tab;