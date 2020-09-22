import React from 'react';
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

// TODO - language
const MultiplicationBlock: React.FC<MultiplicationProps> = ({}) => {
    // const language = useSelector(languageSelector)

    return <MultiplicationWrapper>
        <span className="title">Режим</span>
        <div className="fit">
        <TextFit>
            <div className="desc">
                {/*{language.data?.common.lengthNames[setting.length]}&nbsp;*/}
                {/*<span>{language.data?.common.modeNames[setting.mode]}&nbsp;</span>*/}
                {/*{setting.type === 'o' ? setting.theme : language.data?.common.typeNames[1][setting.type]}*/}
            </div>
        </TextFit>
        </div>
    </MultiplicationWrapper>;
};

export default MultiplicationBlock;