import React from 'react';
import styled from "styled-components";
import {FormItem, Avatar} from "../../../../../../../../lib/ui";
import {DatePicker} from "antd";
import {useSelector} from "react-redux";
import {useScreenWindow} from "../../../../../../../../hooks/use-screen-window.effect";
import {gameSelector} from "../../../../../../../../store/common/game/gameSplice";

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const InputWrapper = styled.div`
  display: grid;
  text-align: left;
  grid-gap: 1rem;
  grid-template-columns: 150px 1fr;
  align-items: center;
  
  @media (max-width: 576px) {
    grid-template-columns: 115px 1fr;
  }

  .image{
    //margin-right: 1rem;
  }
  
  .content{
    width: 100%;
    
    .date-pickers{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
    }
  }
`;

interface InputAnswerProps {
    total: any;
    totalKey: number;
}

const InputAnswer: React.FC<InputAnswerProps> = ({total, totalKey}) => {
    const {setting} = useSelector(gameSelector);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return <InputWrapper>
        <Avatar
            width={isBreakpoint ? '115px' : '150px'}
            className="image"
            src={total.exercise.url_photo}
            alt={total.exercise.full_name}
        />
        <div className="content">
            <FormItem
                label={`Личность №${totalKey + 1}`}
                name={['answer', totalKey, 'full_name']}
                size="large"
                placeholder="Имя"
                marginBottom="0"
                autofocus={totalKey === 0}
            />
            {
                Number(setting.mode) > 1 &&
                <div className="date-pickers">
                    <FormItem name={['answer', totalKey, 'born']} label="Дата рождения" marginBottom="0">
                        <DatePicker format={dateFormatList} style={{width: '100%'}}/>
                    </FormItem>
                    {
                        Number(setting.mode) === 3 &&
                        <FormItem name={['answer', totalKey, 'die']} label="Годы жизни" marginBottom="0">
                            <DatePicker format={dateFormatList} style={{width: '100%'}}/>
                        </FormItem>
                    }
                </div>
            }
        </div>
    </InputWrapper>;
};

export default InputAnswer;