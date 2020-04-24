import React from 'react';
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";
import {settingAnzan} from "../../../../../../../../store/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../../store/tasks/totals/reducer";

const Basic: React.FC = () => {
    const totals = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);
    const isGroup = setting.extra && setting.extra.includes('group');

    if (isGroup)
        return <>
            {
                Object.keys(totals).map((times: any) =>
                    <FormInputAnswerLayout index={times} autoFocus={1} group={times} key={times}/>
                )
            }
        </>;

    return <FormInputAnswerLayout index={1} autoFocus={1}/>;
};

export default Basic;