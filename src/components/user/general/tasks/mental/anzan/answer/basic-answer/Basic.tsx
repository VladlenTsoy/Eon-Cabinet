import React from 'react';
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";


const Basic: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals} = game;
    const isGroup = setting.extra && setting.extra.includes('group');

    return <>
        {
            isGroup ?
                totals.map((total: any, key: any) =>
                    <FormInputAnswerLayout index={key} autoFocus={1} group={key} key={key}/>
                ) :
                <FormInputAnswerLayout index={1} autoFocus={1}/>
        }
    </>;
};

export default Basic;