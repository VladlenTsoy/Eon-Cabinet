import React, {useCallback} from 'react';
import { FileOutlined } from '@ant-design/icons';
import {Form, Radio} from "antd";
import FormSettingWordsList from "./word-list-form-header/WordListFormHeader";
import WordListFormBodyTable from "./word-list-table/WordListTable";
import {RadioWrapper} from "../../../mental/anzan/anzan-form-body/type-setting-anzan/TypeSettingAnzan";
import {FormItem} from "../../../../../../../../layouts/components";
// import WordListModeInformation from "./word-list-mode-information/WordListModeInformation";

type WordListFormBodyProps = {
    clearSaveSetting: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    updateSeveral: (prevState: any) => any;
    setting: any;
    onChange: (changedFields: any, fieldsValue: any) => void;
}

const WordListFormBody: React.FC<WordListFormBodyProps> = (
    {
        clearSaveSetting,
        startApplication,
        addSettingHomework,
        updateSeveral,
    }
) => {
    const [form] = Form.useForm();

    const addSetting = useCallback(async (setting: any) => {
        updateSeveral((prevState: any) => ({
            ...prevState,
            [`setting-${setting.mode}-${setting.type}`]: setting
        }))
    }, [updateSeveral]);

    const deleteSetting = useCallback((keyId: string) => {
        updateSeveral((prevState: any) => {
            delete prevState[keyId];
            return prevState;
        });
    }, [updateSeveral]);

    const clearSetting = (e: any) => {
        e.preventDefault();
        form.resetFields();
        clearSaveSetting();
    };

    return <>
        <FormItem
            name="mode"
            // TODO - значения по умолчанию
            // initialValue="basic"
            marginBottom="0"
        >
            <RadioWrapper size="large" column="1fr 1fr">
                <Radio.Button value="basic">Обычный</Radio.Button>
                <Radio.Button value="list"><FileOutlined /> Листы</Radio.Button>
            </RadioWrapper>
        </FormItem>
        {/*<WordListModeInformation form={form}/>*/}
        <FormSettingWordsList addSetting={addSetting}/>
        <WordListFormBodyTable
            form={form}
            clearSetting={clearSetting}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
            deleteSetting={deleteSetting}
        />
    </>;
};

export default WordListFormBody;
// export default Form.create<WordListFormBodyProps>({
//     /***
//      * Задать настройки пользователя
//      *
//      * @param setting
//      */
//     mapPropsToFields({setting}) {
//         let a: any = {};
//         for (let key in setting)
//             a[key] = Form.createFormField({
//                 ...setting[key],
//                 value: setting[key].value
//             });
//         return a;
//     },
//
//     /***
//      * При изменения полей
//      *
//      * @param props
//      * @param changedFields
//      * @param fieldsValue
//      */
//     onFieldsChange(props, changedFields, fieldsValue) {
//         props.onChange(changedFields, fieldsValue);
//     }
// })(WordListFormBody);