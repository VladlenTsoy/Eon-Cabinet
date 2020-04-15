import React from "react";
import styled from "styled-components";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    borderStyle?: 'solid' | 'dashed'
}

export const TableWrapper: React.FC<TableProps> = styled.table<TableProps>`
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  overflow: hidden;
  
  thead{
    th{
        padding: .3rem;
      i{
        //color: ${props => props.theme.color_second};
        background: #e9ecef;
        border-radius: 50%;
        display: inline-block;
        font-size: 14px;
        height: 20px;
        width: 20px;
      }
    }
  }
  
  td{
    padding: .3rem;
    vertical-align: top;
    border: 1px ${props => props.borderStyle || 'solid'} #dee2e6;
  }
  
  .not-border{
    border: 0;
  }
  
  .numbering{
      padding: .3rem;
      
      span{
        //color: ${props => props.theme.color_second};
        background: #e9ecef;
        border-radius: 50%;
        display: inline-block;
        font-size: 14px;
        height: 20px;
        width: 20px;
      }
  }
`;

export const Result: any = styled.span`
    color: ${(props: any) => props.type ? props.theme[`color_${props.type}`] : 'initial'}
`;