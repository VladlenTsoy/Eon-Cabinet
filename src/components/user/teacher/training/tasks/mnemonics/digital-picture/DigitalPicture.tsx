import React from 'react';
import {useFieldsSetting} from "../../../../../../../effects/use-fields-setting.effect";
import DigitalPictureFormBody from "./digital-picture-form-body/DigitalPictureFormBody";

interface DigitalPictureProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const DigitalPicture: React.FC<DigitalPictureProps> = (
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

    return <DigitalPictureFormBody
        onChange={handlerChangeHeader}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
        setting={fields}
    />;
};

export default DigitalPicture;