import React from "react";
import {useFieldsSetting} from "../../../../../../../effects/use-fields-setting.effect";
import NumbersFormBody from "./numbers-form-body/NumbersFormBody";

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
    const [fields, setFields] = useFieldsSetting({setting: userSetting});

    /**
     * Обновление настроек
     *
     * @param changedFields
     */
    const handlerChangeHeader = (changedFields: any) =>
        setFields((prevState: any) => ({...prevState, ...changedFields}));

    return <NumbersFormBody
        onChange={handlerChangeHeader}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
        setting={fields}
    />;
};

export default Numbers;