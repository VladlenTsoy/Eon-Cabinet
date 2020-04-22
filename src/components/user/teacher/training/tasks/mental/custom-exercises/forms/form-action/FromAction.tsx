import React, {useCallback} from 'react';
import Buttons from "../../../layout/form-body/buttons/Buttons";
import {FormInstance} from "antd/es/form";

interface FromActionProps {
    form: FormInstance,
    titles: any[];
    isEdit?: boolean;
    startApplication?: any;
    addSettingHomework?: any;
    clearFormSetting?: any;
}

const FromAction: React.FC<FromActionProps> = (
    {
        form,
        isEdit = false,
        titles,
        startApplication,
        addSettingHomework,
        clearFormSetting,
    }
) => {
    const updateSetting = useCallback((setting) => {
        let customExercises = titles.find((title: any) => title.id === setting.custom_exercises_id);
        return {
            ...customExercises.setting,
            title: customExercises.title,
            time: setting.time,
            anzan: setting.anzan,
            category_id: setting.category_id,
            custom_exercises_id: setting.custom_exercises_id,
            extra: setting.extra || [],
            ...setting.sound ? {sound: setting.sound} : {}
        }
    }, [titles]);


    const _startApplication = useCallback((setting: any, print: boolean) => {
        if (startApplication) {
            let _setting = updateSetting(setting);
            startApplication(_setting, print);
        }
    }, [startApplication, updateSetting]);

    const _addSettingHomework = useCallback((setting: any) => {
        if (addSettingHomework) {
            let _setting = updateSetting(setting);
            addSettingHomework(_setting);
        }
    }, [addSettingHomework, updateSetting]);

    return <Buttons
        form={form}
        isEdit={isEdit}
        clearSaveSetting={clearFormSetting}
        startApplication={startApplication && _startApplication}
        addSettingHomework={addSettingHomework && _addSettingHomework}
    />;
};

export default React.memo(FromAction);