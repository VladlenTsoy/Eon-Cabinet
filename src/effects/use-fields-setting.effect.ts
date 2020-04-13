import {useEffect, useState} from "react";

// TODO - Удалить
export const useFieldsSetting = ({setting}: any) => {
    const [fields, setFields] = useState<any>({});

    useEffect(() => {
        if (setting) {
            let _fields: any = {};
            for (let key in setting)
                _fields[key] = {
                    value: setting[key]
                };
            setFields(_fields);
        }
    }, [setting]);

    return [fields, setFields];
};