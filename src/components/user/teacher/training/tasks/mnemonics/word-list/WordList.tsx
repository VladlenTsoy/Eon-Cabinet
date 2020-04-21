import React, {useCallback, useEffect, useState} from 'react';
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
    const [fields, setFields] = useState<any[]>([]);

    const addSetting = useCallback(async (setting: any) => {
        setFields((prevState) => {
            let upField = {name: ['several', `setting-${setting.mode}-${setting.type}`], value: setting};
            let nameField = `severalsetting-${setting.mode}-${setting.type}`;
            if (prevState && prevState.length) {
                const indexField = prevState.findIndex((field: any) => field.name.join('') === nameField);

                if (indexField > -1)
                    prevState[indexField] = upField;
                else
                    prevState.push(upField);
            } else
                prevState.push(upField);

            return JSON.parse(JSON.stringify(prevState));
        });
    }, []);

    const deleteSetting = useCallback((keyId: string) => {
        setFields(JSON.parse(JSON.stringify(fields.filter((field: any) => !field.name.includes(keyId)))));
    }, [fields]);

    useEffect(() => {
        if (typeof userSetting === 'object' && Object.keys(userSetting).length)
            Object.values(userSetting.several).map((several: any) => addSetting(several));
    }, [userSetting, addSetting]);

    return <WordListFormBody
        initialValues={{
            mode: 'basic',
            time: 1,
            ...userSetting
        }}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
        deleteSetting={deleteSetting}
        addSetting={addSetting}
        fields={fields}
    />
};

export default WordList;