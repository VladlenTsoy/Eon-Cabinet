import React from 'react';
import styled from "styled-components";

const ResultStyle = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 1rem;
  overflow-x: auto;
`;

const ContainerStyle = styled.table`
  min-width: 100%;
  border-collapse: collapse;
  
  tr {
    border-bottom: 1px solid ${props => props.theme.light_color_border};
    font-size: 30px;
    
    .sub{
      font-size: 25px;
    }
    
    > td {
      padding: 0.5rem 1.5rem;
    }
    
    > td:not(.number):not(.exercises), > th:not(.number):not(.exercises){
      text-align: center;
      justify-content: center;
    }
  }
  
  .header tr th {
    color: ${props => props.theme.color_second};
    font-size: 16px;
  }
  
  .number {
    color: ${props => props.theme.color_second};
  }

  .exercises{
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background: ${props => props.theme.color_border}33;
  }
  
  @media (max-width: 768px) {      
    td {
      font-size: 16px; 
      
      .sub{
        font-size: 14px;
      }
    }
    
    .header tr th{
      font-size: 12px;
    }
  }
`;

interface ResultMoreProps {
    header: React.ReactNode;
}

const ResultMoreLayout: React.FC<ResultMoreProps> = (
    {
        header,
        children
    }
) => {
    return <ResultStyle>
        <ContainerStyle>
            <thead className="header">
            {header}
            </thead>
            <tbody>
            {children}
            </tbody>
        </ContainerStyle>
    </ResultStyle>;
};

export default ResultMoreLayout;