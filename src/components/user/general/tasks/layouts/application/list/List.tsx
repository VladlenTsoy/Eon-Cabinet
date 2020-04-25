import React from 'react';
import {Button, Form, Modal} from "antd";
import {ArrowRightOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import TablesOutput from "./tables-output/TablesOutput";
import {FormInstance} from "antd/es/form";

interface ListProps {
    outputs: any[];
    listForm: FormInstance;
    listSetting: { column: any, list: any, leftNumbering: boolean },
    updateResultsTotals?: (answers: any[]) => void;
}

const List: React.FC<ListProps> = (
    {
        outputs,
        listForm,
        listSetting,
        updateResultsTotals
    }
) => {
    const onFinishHandler = (values: any) => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            title: "У вас еще осталось время, Вы уверены что хотите перейти к ответам?",
            onOk: () => updateResultsTotals && updateResultsTotals(values.answer)
        });
    };

    return <Form form={listForm} onFinish={onFinishHandler} style={{width: '100%'}}>
        <TablesOutput outputs={outputs} listSetting={listSetting}/>
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