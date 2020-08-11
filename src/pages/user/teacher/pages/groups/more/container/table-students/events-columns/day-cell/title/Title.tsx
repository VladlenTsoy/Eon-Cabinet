import React from 'react';
import moment from "moment";
import styled from "styled-components";

const WeekStyled = styled.span`
  text-transform: capitalize;
  color: ${props => props.theme.color_second};
`

interface TitleProps{
    day: string;
}

const Title:React.FC<TitleProps> = ({day}) => {
    const week = moment(day).format('e')
    const month = moment(day).format('ddd')
    const dayAndMonth = moment(day).format('DD MMM')

    return <div data-key={week}>
        <WeekStyled>{month} / </WeekStyled>
        <span>{dayAndMonth}</span>
    </div>;
};

export default Title;