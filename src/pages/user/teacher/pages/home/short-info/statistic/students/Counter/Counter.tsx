import React from 'react';
import {Popover} from "antd";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
import styled from "styled-components";

const CounterStyled = styled.div`
  display: flex;
  flex-direction: column;
    
  > div:first-child {
    color: ${props => props.theme['@text-color-secondary']};
    font-size: 12px;
      
    .anticon{
      margin-left: 0.25rem;
      cursor: pointer;
    }
  }
    
  > div:last-child {
    position: relative;
    font-size: 22px;
    font-weight: 300;
      
    span.anticon-arrow-up {
      color: ${props => props.theme.color_success};
      font-size: 20px;
      position: relative;
      top: -6px;
    }
      
    span.anticon-arrow-down {
      color: ${props => props.theme.color_danger};
      font-size: 20px;
    }
  }
`

interface CounterProps {
    title: string
    description: string
    loading: boolean
    data?: {
        count: number
        increase: number
        percent: number
    }
}

const Counter: React.FC<CounterProps> = ({loading, data, title, description}) => {
    return <CounterStyled>
        <div>
            {title}
            <Popover content={<>{description}</>}>
                <QuestionCircleOutlined/>
            </Popover>
        </div>
        <div>
            {
                loading || !data ?
                    <LoadingOutlined/> :
                    <>
                        {data.increase ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        {data.percent.toFixed(1)}%
                    </>
            }

        </div>
    </CounterStyled>
};

export default Counter;