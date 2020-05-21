import styled from "styled-components";

const BlockWrapper = styled.div`
  display: flex;
    
  > .anticon{
    margin-right: 1rem;
    font-size: 25px;
    color: ${props => props.theme.color_minimal};
  }
    
  > div {
    > span{
      display: inline-block;
      margin-bottom: 0.25rem;
      color: ${props => props.theme.color_black};
    }
    
    > p {
      margin-bottom: 0;
    }
  }
`;

export default BlockWrapper;