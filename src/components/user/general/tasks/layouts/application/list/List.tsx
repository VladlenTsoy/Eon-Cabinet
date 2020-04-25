import React from 'react';
import {SettingAnzanListProps} from "store/tasks/setting/games-types/anzan.types";
import {Button, Form, Modal} from "antd";
import {ArrowRightOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import TablesOutput from "./tables-output/TablesOutput";
import {FormInstance} from "antd/es/form";

interface ListProps {
    outputs: any[];
    listForm: FormInstance;
    setting: SettingAnzanListProps;
    updateResultsTotals?: (answers: any[]) => void;
}

const List: React.FC<ListProps> = (
    {
        outputs,
        listForm,
        setting,
        updateResultsTotals
    }
) => {
    const onFinishHandler = (values: any) => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            title: 'У вас еще есть время',
            onOk: () => updateResultsTotals && updateResultsTotals(values.answer)
        });
    };

    return <Form form={listForm} onFinish={onFinishHandler}>
        <TablesOutput outputs={outputs} setting={setting}/>
        <Button
            block
            type="primary"
            htmlType="submit"
            icon={<ArrowRightOutlined/>}
        >
            Далее
        </Button>
    </Form>;
};

export default List;