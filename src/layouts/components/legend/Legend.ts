import styled from "styled-components";

const Legend: any = styled.legend`
  display: flex;
  align-items: center;
  color: ${props => props.theme.legend_color};
  white-space: nowrap;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
    
  ::after, ::before{
    content: "";
    height: 1px;
    width: 100%;
    background: ${props => props.theme.light_color_border};
    opacity: 0.5;
  }
  
  ::after{
    margin-left: 1.5rem;
  }
    
  ::before{
    margin-right: 1.5rem;
  }
`;
export default Legend;