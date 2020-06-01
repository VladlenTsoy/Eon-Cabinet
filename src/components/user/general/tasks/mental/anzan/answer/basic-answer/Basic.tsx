import React from 'react';
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../../store/reducers/common/game/gameSplice";

const Basic: React.FC = () => {
    const {totals, setting} = useSelector(gameSelector);
    const isGroup = setting.extra && setting.extra.includes('group');

    if (isGroup)
        return <>
            {
                Object.keys(totals).map((times: any) =>
                    <FormInputAnswerLayout type="number" index={times} autoFocus={1} group={times} key={times}/>
                )
            }
        </>;

    return <FormInputAnswerLayout type="number" index={1} autoFocus={1}/>;
};

export default Basic;