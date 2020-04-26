import React from "react";
import styled from "styled-components";

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
    borderStyle?: 'solid' | 'dashed'
}

export const TableLayout: React.FC<TableProps> = styled.table<TableProps>`
  //width: 100%;
  //margin-bottom: 1rem;
  text-align: center;
  overflow: hidden;
  
  // new
  user-select: none;
  width: 100%;
  margin-bottom: 0.5rem;
  
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
    vertical-align: middle;
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
  
  tr{
    transition: all 0.3s ease-in-out; 
    :hover{
      //background: ${props => props.theme.color_border};
      background: ${props => props.theme.color_primary}14;
    }
  }
`;