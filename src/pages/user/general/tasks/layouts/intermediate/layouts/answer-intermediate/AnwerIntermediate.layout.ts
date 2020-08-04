import styled from "styled-components";

const AnswerIntermediateLayout = styled.div`
    text-align: center;

    .title {
      color: ${props => props.theme.color_second};
      display: block;
    }

    .desc {
      font-size: 90px;
      line-height: 120px;
      color: ${props => props.theme.color_success};
      font-weight: bolder;
      
      &.danger {
        color: ${props => props.theme.color_danger};
      }
    }
    
    .double {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    
    @media (max-width: 576px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      
      .desc{
        font-size: 70px;
      }
      
      > span:first-child{
          order: 1;
      }
      
      > span:nth-of-type(3){
          order: 2;
      }
      
      > span:nth-of-type(2){
          order: 3;
      }
      
      > span:nth-of-type(4){
          order: 4;
      }
    }
`;

export default AnswerIntermediateLayout;