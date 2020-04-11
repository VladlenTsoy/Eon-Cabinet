import React from 'react';
import {useFieldsSetting} from "../../../../../../../effects/use-fields-setting.effect";
import CountriesFormBody from "./countries-form-body/CountriesFormBody";

interface CountriesProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Countries: React.FC<CountriesProps> = (
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

    return <CountriesFormBody
        onChange={handlerChangeHeader}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
        setting={fields}
    />;
};

export default Countries;