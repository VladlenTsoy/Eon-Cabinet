import React from 'react';
import styled from "styled-components";
import {FormItem, UserImage} from "../../../../../../../../layouts/components";
import {DatePicker} from "antd";
import {useSelector} from "react-redux";
import {useScreenWindow} from "../../../../../../../../effects/use-screen-window.effect";

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
    form: any;
    total: any;
    totalKey: number;
}

const InputAnswer: React.FC<InputAnswerProps> = ({form, total, totalKey}) => {
    const {game} = useSelector((state: any) => state);
    const {setting} = game;
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return <InputWrapper>
        <UserImage
            width={isBreakpoint ? '115px' : '150px'}
            className="image"
            src={total.exercise.url_photo}
            alt={total.exercise.full_name}
        />
        <div className="content">
            <FormItem
                label={`Личность №${totalKey + 1}`}
                form={form}
                name={`answer[${totalKey}][full_name]`}
                size="large"
                placeholder="Имя"
                marginBottom="0"
                autofocus={totalKey === 0}
            />
            {Number(setting.mode) > 1 ?
                <div className="date-pickers">
                    <FormItem form={form} name={`answer[${totalKey}][born]`} label="Дата рождения" marginBottom="0">
                        <DatePicker format={dateFormatList} style={{width: '100%'}}/>
                    </FormItem>
                    {Number(setting.mode) === 3 ?
                        <FormItem form={form} name={`answer[${totalKey}][die]`} label="Годы жизни" marginBottom="0">
                            <DatePicker format={dateFormatList} style={{width: '100%'}}/>
                        </FormItem> : null}
                </div> : null}
        </div>
    </InputWrapper>;
};

export default InputAnswer;