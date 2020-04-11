import styled from "styled-components";

const BlockLayout = styled.div`
  .title{
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-gap: 1rem;
    margin-bottom: 0.5rem;
    align-items: center;
    
    i{
      font-size: 30px;
      color: ${props => props.theme.color_minimal};
    }
    
    span{
      font-size: 20px;
      color: ${props => props.theme.color_minimal};
    }
  }
    
  .content{
    margin-left: 46px;
  }
`;

export default BlockLayout;