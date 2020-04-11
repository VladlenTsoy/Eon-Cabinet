import React, {useCallback} from 'react';
import {useFieldsSetting} from "../../../../../../../effects/use-fields-setting.effect";
import WordListFormBody from "./word-list-form-body/WordListFormBody";

interface SettingWordsListProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const WordList: React.FC<SettingWordsListProps> = (
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

    const updateSeveral = useCallback((funcSetting: (prevState: any) => any) => {
        setFields((prevState: any) => ({
                ...prevState, ...{
                    several: {
                        value: funcSetting(prevState.several ? prevState.several.value : {})
                    }
                }
            })
        );
    }, [setFields]);

    return <WordListFormBody
        onChange={handlerChangeHeader}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
        updateSeveral={updateSeveral}
        setting={fields}
    />
};

export default WordList;