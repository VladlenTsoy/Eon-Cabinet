import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import TextFit from "./TextFit";

const MultiplicationWrapper = styled.div`
  padding: 0 1rem;
  width: 100%;
  
  .title{
    display: block;
    font-size: 22px;
    color: ${props => props.theme.color_second};
  }
  
  .desc{
    font-weight: 900;
    margin-bottom: 1rem;
    width: 100%;
    //padding: 0 1rem;
    display: inline-block;
    overflow: hidden;
    line-height: 100px;
      
    span{
      color: ${props => props.theme.color_warning};
    }
  }
`;

interface MultiplicationProps {
    setting: any;
}

const MultiplicationBlock: React.FC<MultiplicationProps> = ({setting}) => {
    const {language} = useSelector((state: any) => state);

    return <MultiplicationWrapper>
        <span className="title">Режим</span>
        <TextFit>
            <div className="desc">
                {language.common.lengthNames[setting.length]}&nbsp;
                <span>{language.common.modeNames[setting.mode]}&nbsp;</span>
                {setting.type === 'o' ? setting.theme : language.common.typeNames[1][setting.type]}
            </div>
        </TextFit>
    </MultiplicationWrapper>;
};

export default MultiplicationBlock;