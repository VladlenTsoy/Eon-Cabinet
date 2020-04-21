import React, {useState} from "react";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";
import FormItems from "./form-items/FormItems";

interface NumbersProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Numbers: React.FC<NumbersProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const setting = userSetting.hasOwnProperty('mode') ? {...userSetting, mode: String(userSetting.mode)} : userSetting;
    const [typeTask, setTypeTask] = useState(() =>
        typeof userSetting === 'object' && Object.keys(userSetting).length ? userSetting['task-mode'] : 'basic'
    );

    const onChangeHandler = (changeValues: any, allValues: any) => {
        setTypeTask(allValues['task-mode']);
    };

    return <FormSettingLayout
        initialValues={{
            'task-mode': 'basic',
            mode: '1',
            count: 1,
            time: 1,
            extra: [],
            sound: 'basic',
        }}
        onValuesChange={onChangeHandler}
        userSetting={setting}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
    >
        <FormItems typeTask={typeTask}/>
    </FormSettingLayout>
};

export default Numbers;