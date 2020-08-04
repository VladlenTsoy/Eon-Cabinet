import React from 'react';
import {FileOutlined} from '@ant-design/icons';
import {Form, Radio} from "antd";
import FormSettingWordsList from "./word-list-form-header/WordListFormHeader";
import WordListFormBodyTable from "./word-list-table/WordListTable";
import {RadioWrapper} from "../../../mental/anzan/forms/type-form/TypeForm";
import {FormItem} from "../../../../../../../../../lib/components";
// import WordListModeInformation from "./word-list-mode-information/WordListModeInformation";

type WordListFormBodyProps = {
    clearSaveSetting: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    addSetting: (setting: any) => void;
    deleteSetting: (key: string) => void;
    fields: any;
    initialValues: any;
}

const WordListFormBody: React.FC<WordListFormBodyProps> = (
    {
        fields,
        initialValues,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
        addSetting,
        deleteSetting,
    }
) => {
    const [form] = Form.useForm();

    const clearSetting = (e: any) => {
        e.preventDefault();
        form.resetFields();
        clearSaveSetting();
    };

    return <>
        <Form
            form={form}
            fields={fields}
            initialValues={initialValues}
            layout="vertical"
        >
            <FormItem
                name="mode"
                marginBottom="0"
            >
                <RadioWrapper size="large" column="1fr 1fr">
                    <Radio.Button value="basic">Обычный</Radio.Button>
                    <Radio.Button value="list"><FileOutlined/> Листы</Radio.Button>
                </RadioWrapper>
            </FormItem>
        </Form>
        {/*<WordListModeInformation form={form}/>*/}
        <FormSettingWordsList addSetting={addSetting}/>
        <WordListFormBodyTable
            form={form}
            fields={fields}
            clearSetting={clearSetting}
            startApplication={startApplication}
            addSettingHomework={addSettingHomework}
            deleteSetting={deleteSetting}
        />
    </>;
};

export default WordListFormBody;