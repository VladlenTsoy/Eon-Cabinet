import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {languageSelector} from "../../../../../../../../../../store/common/language/languageSlice";

const AdditionWrapper = styled.div`
  div{
    span{
      color: ${props => props.theme.color_second};
      margin-right: 0.5rem;
    }
  }
`;

const ModeWrapper = styled.div`
  background: ${props => props.theme.color_warning};
  height: 75px;
  width: 75px;
  border-radius: 50%;
  font-size: 90px;
  line-height: 65px;
  font-weight: 900;
  margin: 0 auto 1rem;
  color: ${props => props.theme['component-background']};
`;

interface AdditionProps {
    setting: any;
}

const AdditionBlock: React.FC<AdditionProps> = ({setting}) => {
    const language = useSelector(languageSelector);

    return <AdditionWrapper>
        <ModeWrapper>
            {language.data?.common.modeNames[setting.mode]}
        </ModeWrapper>
        <div>
            <span>Разряд чисел:</span>
            {`${setting.length}-значные`}
        </div>
        <div>
            <span>Режим:</span>
            {language.data?.common.typeNames[0][setting.type]}
        </div>
        <div>
            <span>Тема:</span>
            {setting.theme}
        </div>
    </AdditionWrapper>;
};

export default AdditionBlock;