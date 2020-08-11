import React from 'react';
import styled from "styled-components";
import {DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";
import DayCell from "./day-cell/DayCell";

const HeaderCalendarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  
  .prev, .next {
    color: ${props => props.theme.color_primary};
    cursor: pointer;
  }
  
  .prev .anticon { margin-right: 0.25rem}
  .next .anticon { margin-left: 0.25rem}
`

const EventsColumns = ({prev, next, dates, loading}: any) => {
    return [
        {
            title: <HeaderCalendarStyled>
                <span className="prev" onClick={prev}>
                    <DoubleLeftOutlined/>Предыдущая неделя
                </span>
                <span className="title">Календарь</span>
                <span className="next" onClick={next}>
                    Следущая неделя<DoubleRightOutlined/>
                </span>
            </HeaderCalendarStyled>,
            children: dates.map((date: any) => DayCell({...date, loading}))
        }
    ]
};

export default EventsColumns;