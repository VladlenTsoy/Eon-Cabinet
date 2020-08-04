import React from 'react';
import {useAppContext} from "store/context/use-app-context";
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
  
  .fit{
    width: 50%;
    line-height: 1;
    margin: 0 auto;
  }
  
  .desc{
    font-weight: 900;
    margin-bottom: 1rem;
    width: 100%;
    //padding: 0 1rem;
    display: inline-block;
    overflow: hidden;
    line-height: 0.7;
      
    span{
      color: ${props => props.theme.color_warning};
    }
  }
`;

interface MultiplicationProps {
    setting: any;
}

const MultiplicationBlock: React.FC<MultiplicationProps> = ({setting}) => {
    const {language} = useAppContext();

    return <MultiplicationWrapper>
        <span className="title">Режим</span>
        <div className="fit">
        <TextFit>
            <div className="desc">
                {language.common.lengthNames[setting.length]}&nbsp;
                <span>{language.common.modeNames[setting.mode]}&nbsp;</span>
                {setting.type === 'o' ? setting.theme : language.common.typeNames[1][setting.type]}
            </div>
        </TextFit>
        </div>
    </MultiplicationWrapper>;
};

export default MultiplicationBlock;