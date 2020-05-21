import styled from "styled-components";

export const CheckWrapper = styled.table`
  width: 100%; 
  font-size: 16px;
  border: 1px solid ${props => props.theme['@layout-body-background']};
  
  tr{
    
    td:last-child:not(:first-child), th:last-child:not(:first-child){
      text-align: right;
    }
    
    td, th{
      padding: 0.5rem 1rem;
      //border-top: 1px solid ${props => props.theme.color_border};
      //border-bottom: 1px solid ${props => props.theme.color_border};
      border: 1px solid ${props => props.theme['@layout-body-background']};
    }
    
    .empty{
      border: 0;
    }
  }
  
  .sub{
    font-size: 14px;
    // background: ${props => props.theme['@layout-body-background']};
    
    td{
      color: ${props => props.theme.color_second};
    }
    
    td:first-child{
      padding-left: 2rem;
    }
  }
  
  //tbody{
  //  tr:nth-of-type(even){
  //    background: ${props => props.theme['@layout-body-background']};
    //}
  //}
`;