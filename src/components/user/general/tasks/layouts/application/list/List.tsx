import React from 'react';
import {Button, Form} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import TablesOutput, {ListSettingProps} from "./tables-output/TablesOutput";
import {FormInstance} from "antd/es/form";

interface ListProps {
    outputs: any[];
    listForm: FormInstance;
    listSetting: ListSettingProps,
    earlierCompletion?: (values: any) => void;
}

const List: React.FC<ListProps> = (
    {
        outputs,
        listForm,
        listSetting,
        earlierCompletion
    }
) => {
    return <Form form={listForm} onFinish={earlierCompletion} style={{width: '100%'}}>
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