import React from 'react';
import FlashFormBody from "./flash-form-body/FlashFormBody";
import {useFieldsSetting} from "../../../../../../../effects/use-fields-setting.effect";

interface FlashProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Flash: React.FC<FlashProps> = (
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

    return <FlashFormBody
        onChange={handlerChangeHeader}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
        setting={fields}
    />;
};

export default Flash;