import React from 'react';
import styled from "styled-components";
import moment from "moment";

const ContentStyled = styled.div`
  display: grid;
  grid-template-columns: 135px 1fr;
  grid-template-rows: auto auto;
  height: 100%;
  gap: 0 1.5rem;
  padding-left: 0.5rem;
  
  .title {
    color: ${props => props.theme.color_minimal};
    display: flex;
    align-items: flex-end;
  }

  .date, .desc {
    display: flex;
    align-items: flex-start;
  }
  
  .date {
    font-size: 30px;
  }
  
  .desc {
    font-size: 20px;
  }
  
  @media (max-width: 1600px) {
    grid-template-columns: 100px 1fr;
    gap: 0.5rem;
    
    .date {
      font-size: 20px;
    }
  
    .desc {
      font-size: 16px;
    }
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
      
    .title {
      font-size: 12px;
      
      &:first-child{
        display: none;
      }
    }
    
    .date {
      font-size: 16px;
      display: none;
    }
  
    .desc {
      font-size: 14px;
    }
  }
`;

interface InformationProps {
    created_at: any;
    description: any;
}

const Information: React.FC<InformationProps> = ({created_at, description}) => {
    const momentFormatCheckYear = (date: any, formatOne: string, formatTwo: string) => {
        const years = moment(date).diff(date, 'years', false);
        return moment(date).format(years ? formatTwo : formatOne);
    };

    return <ContentStyled>
        <span className="title">Создан:</span>
        <span className="title">Описание:</span>
        <span className="date">{momentFormatCheckYear(created_at, 'DD MMM', 'DD.MM.YY')}</span>
        <span className="desc">{description}</span>
    </ContentStyled>
};

export default Information;