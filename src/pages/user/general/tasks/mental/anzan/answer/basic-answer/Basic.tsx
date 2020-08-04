import React from 'react';
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../../store/common/game/gameSplice";

const Basic: React.FC = () => {
    const {totals, setting} = useSelector(gameSelector);
    const isGroup = setting?.extra.includes('group');

    if (isGroup)
        return totals.map((total: any, key: number) =>
            <FormInputAnswerLayout type="number" index={key} autoFocus={0} group={key + 1} key={key}/>
        )

    return <FormInputAnswerLayout type="number" index={1} autoFocus={1}/>;
};

export default React.memo(Basic);