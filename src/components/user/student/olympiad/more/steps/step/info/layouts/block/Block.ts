import styled from "styled-components";

const BlockWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1.5rem;

  .image {
    height: 100px;
    width: 100px;
  
    img {
      filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
      width: 100%;
    }
  }

  .icon{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background: #ff9838;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    color: #fff;
    border: 10px solid #ffe27a;
  
    .anticon{
      font-size: 50px;
    }
  }

  .content{
    .title{
      display: block;
      font-size: 20px;
      margin-bottom: 0.25rem;
      color: ${props => props.theme.color_minimal};
    }
  
    .counts{
      font-size: 50px;
      line-height: 1;
      color: ${props => props.theme.color_second};
    
      .slash{
        margin: 0 0.25rem;
        color: ${props => props.theme.color_minimal};
      }
    
      .active{
        color: ${props => props.theme.color_warning};
      }
    }
  
    .timer{
      font-size: 29px;
    }
  }
    
  @media (max-width: 992px) {
     grid-template-columns: 75px 1fr;
     gap: 1rem;

    .image {
      height: 75px;
      width: 75px;
    }
    
    .icon{
      height: 75px;
      width: 75px;
      padding: 10px;
      border: 7px solid #ffe27a;
  
      i{
        font-size: 40px;
      }
    }
    
    .content{
      .title{
        font-size: 16px;
      }   
      
      .counts{
        font-size: 35px;
      } 
      
      .timer{
        font-size: 20px;
      } 
    }    
  }    
    
  @media (max-width: 768px) {
     grid-template-columns: 50px 1fr;
     gap: 0.5rem;

    .image {
      height: 50px;
      width: 50px;
    }
    
    .icon{
      height: 50px;
      width: 50px;
      border: 5px solid #ffe27a;
  
      i{
        font-size: 25px;
      }
    }
    
    .content{
      .title{
        font-size: 14px;
      }   
      
      .counts{
        font-size: 25px;
      } 
      
      .timer{
        font-size: 16px;
      } 
    }    
  }
    
  @media (max-width: 576px) {
    width: 140px;
    margin: 0 auto;
    
    &:last-child{
      grid-column-start: 1;
      grid-column-end: 3;
      width: 170px;
      margin: 0 auto;
    }
  }
`;

export default BlockWrapper;