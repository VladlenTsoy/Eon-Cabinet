import React from "react";
import {LoadingOutlined} from '@ant-design/icons';
import Card from "../../lib/card/Card";
import styled from "styled-components";

interface CardStatisticProps {
    title: string;
    theme: string;
    icon: React.ReactNode;
    loading: boolean;
    count?: number | null;
    active?: number | null;
    activeTitle?: string;
    items?: any;
}

const CardStatisticWrapper = styled(Card)`
  text-align: center;
`;

const Title = styled.h2`
    font-size: 16px;
`;

const StatisticWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
`;

export const IconWrapper = styled.div<any>`
    display: flex;
    //width: 35px;
    //height: 35px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    //margin-right: .5rem;
    //font-size: 18px;
    color: #ffffff;
      
    background: ${props => props.theme['color_' + props.t]};
    box-shadow: ${props => props.theme['shadow_' + props.t]};
    
    //@media (min-width: 768px) {
        width: 50px;
        height: 50px;
        font-size: 26px;
        margin-right: 1.5rem;
    //}
`;

const ContentWrapper = styled.div`
  :not(:last-child) {
    margin-right: .5rem;
  }
  
  //@media (min-width: 768px) {
    :not(:last-child) {
      margin-right: 1.5rem;
    }
  //}
`;

const TitleContent = styled.span`
  width: 100%;
  display: block;
  font-size: 10px;
  text-align: center;
  color: ${props => props.theme.color_second};
  
  @media (min-width: 768px) {
      font-size: 12px;
  }
`;

const CountContent = styled.span<any>`
  width: 100%;
  display: block;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
  color: ${props => props.theme['color_' + props.t]};
`;

const CardStatistic: React.FC<CardStatisticProps> = ({title, theme, icon, loading, count = null, activeTitle, active = null, items}) =>
    <CardStatisticWrapper>
        <Title>{title}</Title>
        <StatisticWrapper>
            <IconWrapper t={theme}>
                {icon}
            </IconWrapper>
            {count !== null ? <ContentWrapper>
                <TitleContent>Всего</TitleContent>
                <CountContent>
                    {loading ? <LoadingOutlined/> : count}
                </CountContent>
            </ContentWrapper> : null}

            {active !== null ? <ContentWrapper>
                <TitleContent>{activeTitle || 'Активных'}</TitleContent>
                <CountContent t={theme}>
                    {loading ? <LoadingOutlined/> : active}
                </CountContent>
            </ContentWrapper> : null}

            {items ? items.map((item: any, key: number) =>
                <ContentWrapper key={key}>
                    <TitleContent>{item.title}</TitleContent>
                    <CountContent t={item.type}>
                        {loading ? <LoadingOutlined/> : item.count}
                    </CountContent>
                </ContentWrapper>
            ) : null}

        </StatisticWrapper>
    </CardStatisticWrapper>;

export default CardStatistic;
