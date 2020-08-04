import styled from "styled-components";

export const TableSettingWrapper = styled.table`
  margin-bottom: 1rem;
  width: 100%;
  text-align: left;
    
  td{
    border: 0;
    border-bottom: 1px solid #f2f4f7;
    font-size: 14px;
  }
  
  tr{
    td:nth-of-type(odd){
      color: ${props => props.theme.color_second};
    }
  }
`;