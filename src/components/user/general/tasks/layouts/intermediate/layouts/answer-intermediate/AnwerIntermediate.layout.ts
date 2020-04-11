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
      
      &.danger{
        color: ${props => props.theme.color_danger};
      }
    }
`;

export default AnswerIntermediateLayout;