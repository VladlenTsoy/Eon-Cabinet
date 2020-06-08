import React, {useEffect} from 'react';
import ConfigBlock from "../../../../config/Config";
import ListSetting from "./list/List";
import BasicSetting from "./basic/Basic";
import {Form} from "antd";

interface AnzanFormBodyProps {
    isClearForm: boolean;
    initialValues: any;

    sound?: boolean;
    isMultiAnzan: boolean;
    mods?: string;

    isMirror: boolean;
    typeTask: string;
    mode: string;
    length: string;
    isMultiplication: boolean;
}

const BodyForm: React.FC<AnzanFormBodyProps> = (
    {
        isClearForm,
        initialValues,
        sound,
        isMultiAnzan,
        mods,

        isMultiplication,
        isMirror,
        typeTask,
        mode,
        length,
    }
) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isClearForm)
            form.resetFields()
    }, [form, isClearForm]);

    useEffect(() => {
        if ((typeTask !== 'basic' && typeTask !== 'turbo') || (mode !== 'plus' && mode !== 'plus-minus' && mode !== 'minus') || (Number(length) * (isMirror ? 2 : 1) > 3))
            form.setFieldsValue({sound: 'basic'});

    }, [length, typeTask, mode, form, isMirror])

    return <Form
        form={form}
        name="body"
        layout="vertical"
        initialValues={{
            count: 1,
            times: 1,
            time: 1,
            tables: 1,
            column: 10,
            rows: 4,
            extra: [],
            sound: 'basic',
            ...initialValues
        }}
    >
        {
            typeTask === 'list' ?
                <ListSetting/> :
                <BasicSetting
                    length={length}
                    mods={mods}
                    multi={isMultiAnzan}
                    isMultiplication={isMultiplication}
                />
        }
        <ConfigBlock
            sounds={
                typeTask !== 'list' && sound ?
                    {
                        language: !isMultiplication && typeTask !== 'double' && Number(length) * (isMirror ? 2 : 1) <= 3,
                    } : false
            }
            mods={
                isMultiplication ?
                    {
                        group: !isMultiAnzan && typeTask !== 'list'
                    } :
                    {
                        plus: true,
                        group: !isMultiAnzan && typeTask !== 'list',
                        comma: true,
                        mirror: true,
                        abacus: typeTask !== 'turbo' && typeTask !== 'list'
                    }
            }
        />
    </Form>;
};

export default React.memo(BodyForm);