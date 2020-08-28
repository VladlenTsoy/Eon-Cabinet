import styled from "styled-components";

const SideBlockLayout = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  align-items: center;
  
  .ant-card.info{
    margin-bottom: 0;
  
    .title{
      color: ${props => props.theme.color_second};
      margin-bottom: 0.5rem;
    }
    
    .container {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: 50px 1fr;
      align-items: center;
      
      &:not(:last-child), &:first-child{
        margin-bottom: 1rem;
      }
      
      .icon{
        font-size: 30px;
        background: #ff9838;
        border-radius: 50%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #ffe27a;
        color: #fff;
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
      }
      
      .content{
        font-size: 20px;
        
        &.timer{
          font-size: 30px;
          font-weight: bold;
        }
        
        .active{
          color: ${props => props.theme.color_warning};
        }
        
        @media (max-width: 576px) {
          font-size: 16px;
          
          &.timer{
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export default SideBlockLayout;