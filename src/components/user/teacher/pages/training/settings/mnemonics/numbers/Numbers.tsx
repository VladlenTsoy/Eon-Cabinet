import React, {useCallback, useState} from "react";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";
import FormItems from "./form-items/FormItems";
import {useScreenWindow} from "../../../../../../../../hooks/use-screen-window.effect";

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
    const setting = typeof userSetting === 'object' && userSetting.hasOwnProperty('mode') ? {...userSetting, mode: String(userSetting.mode)} : userSetting;
    const [typeTask, setTypeTask] = useState(() =>
        typeof userSetting === 'object' && Object.keys(userSetting).length ? userSetting['task-mode'] : 'basic'
    );

    const onChangeHandler = (changeValues: any, allValues: any) => {
        setTypeTask(allValues['task-mode']);
    };
    /****/
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const updateSettingForSend = useCallback((setting: any) => {
        setting.column = isBreakpoint ? 2 : 10;
        return setting;
    }, [isBreakpoint]);

    const startTraining = useCallback(async (setting: any, print?) => {
        addSettingHomework && await addSettingHomework(updateSettingForSend(setting));
        startApplication && await startApplication(updateSettingForSend(setting), print);
        return setting;
    }, [addSettingHomework, startApplication, updateSettingForSend])

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
        startApplication={startApplication && startTraining}
        addSettingHomework={addSettingHomework && startTraining}
    >
        <FormItems typeTask={typeTask}/>
    </FormSettingLayout>
};

export default Numbers;