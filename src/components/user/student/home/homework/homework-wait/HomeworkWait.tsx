import React from 'react';
import {MoreWrapper} from "../homework-more/HomeworkMoreLink";
import { HomeOutlined } from '@ant-design/icons';
import {useAppContext} from "store/context/use-app-context";
import styled from "styled-components";

const WaitWrapper = styled(MoreWrapper)`
  color: ${props => props.theme.light_color_border};
  border: 0;
  cursor: default;
  pointer-events: none;
  
  &:hover{
    color: ${props => props.theme.light_color_border};
  }
`;

interface HomeworkWait {

}

const HomeworkWait:React.FC<HomeworkWait> = () => {
    const {language} = useAppContext();

    return (
      <WaitWrapper to={''}>
          <HomeOutlined />
          <span>{language.common.empty}</span>
      </WaitWrapper>
    );
};

export default HomeworkWait;