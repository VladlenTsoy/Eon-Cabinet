import React from 'react';
import styled from "styled-components";
import {BasicWrapper} from "../basic-input/BasicInput";
import {FormItem} from "../../../../../../../../../layouts/components";
import {Typography} from "antd";
import {useSelector} from "react-redux";
import TextFit
    from "../../../../../../../teacher/training/settings/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import {totalsSelect} from "../../../../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../../../store/tasks/setting/reducer";

const {Title} = Typography;

const GroupWrapper = styled(BasicWrapper)`
  h2.ant-typography{
    color: ${props => props.theme.color_primary};
  }
  
  h4.ant-typography{
    color: ${props => props.theme.color_second};
  }
  
  input{
    text-align: center;
  }
  
  .item-block{
    width: 100%;
    overflow: auto;
  }
  
  .output-answer{
    white-space: nowrap;
    line-height: 1;
    font-weight: 600;
    margin-bottom: 0.5rem;
    width: 100%;
  }
`;

interface GroupInputProps {
    taskKey: number;
    isAnswersOpen: boolean;
}

const GroupInput: React.FC<GroupInputProps> = (
    {
        taskKey,
        isAnswersOpen,
    }
) => {
    const totals: any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);

    return <GroupWrapper>
        <Title level={2}>Пользователь №{taskKey + 1}</Title>
        {totals.exercise[taskKey].map((val: any, key: number) =>
            <div className="item-block" key={key}>
                <Title level={4}>Ответ №{key + 1}</Title>
                {isAnswersOpen ?
                    <TextFit widthOnly maxFontSize={65}>
                        <div className="output-answer">
                            {val[0] + (setting.windows[taskKey].mode === 'multiply' ? ' * ' : ' / ') + val[1]} = {totals.answer[taskKey][key]}
                        </div>
                    </TextFit> :
                    <FormItem
                        size="large"
                        autofocus={taskKey === 0 && key === 0}
                        placeholder={`Ответ`}
                        name={['answer', taskKey, key]}
                        requiredMsg={`Введите ответ №${taskKey + 1}`}
                    />
                }
            </div>
        )}
    </GroupWrapper>;
};

export default GroupInput;