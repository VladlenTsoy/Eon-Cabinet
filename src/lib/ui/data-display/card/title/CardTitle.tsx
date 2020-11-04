import React from "react";
import {Title} from "lib/ui";
import style from './CardTitle.module.css'
import styled from "styled-components";

const TitleWrapper = styled(Title)`
 &.ant-typography{
  margin-bottom: 1rem;
 } 
`;

const SubTitleWrapper = styled.div`
  margin-bottom: 1rem;
  color: ${props => props.theme.color_second};
`;

interface CardTitleProps {
    title: string;
    subTitle?: string;
    level?: any;
}

const CardTitle: React.FC<CardTitleProps> = ({title, subTitle, level}) => {
    return <>
        <TitleWrapper level={level || 2} key="title">{title}</TitleWrapper>
        {subTitle ? <SubTitleWrapper key="sub-title">{subTitle}</SubTitleWrapper> : null}
    </>
};

export default CardTitle;
