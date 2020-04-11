import React from 'react';
import SpecialFormBody from "./special-form-body/SpecialFormBody";
import {useFieldsSetting} from "../../../../../../../effects/use-fields-setting.effect";

interface SpecialProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Special: React.FC<SpecialProps> = (
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

    return <>
        <SpecialFormBody
            onChange={handlerChangeHeader}
            clearSaveSetting={clearSaveSetting}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
            setting={fields}
        />

    </>;
};

export default Special;