import React from 'react';
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface WordListModeInformationProps {
    form: any;
}

const BasicWrapper = styled.div`
  height: 100px;
  display: flex;
  margin: 1rem;
  align-items: center;
  justify-content: center;
`;

const ArrowWrapper = styled.div`
  i{
    font-size: 25px;
    color: ${props => props.theme.color_second};
  }
`;

const ContentWrapper = styled.div`
  background: ${props => props.theme['@background-color-base']};
  height: 100%;
  width: 250px;
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color_second};
  font-size: 40px;
  font-weight: bolder;
`;

const WordListModeInformation: React.FC<WordListModeInformationProps> = ({form}) => {
    return form.getFieldValue('mode') === 'basic' ?
        <BasicWrapper>
            <ArrowWrapper>
                <LeftOutlined />
            </ArrowWrapper>
            <ContentWrapper>12</ContentWrapper>
            <ArrowWrapper>
                <RightOutlined />
            </ArrowWrapper>
        </BasicWrapper> :
        <>
            list
        </>;
};

export default WordListModeInformation;