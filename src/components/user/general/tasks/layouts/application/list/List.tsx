import React from 'react';
import {SettingAnzanListProps} from "store/tasks/setting/games-types/anzan.types";
import {Card} from "lib";
import {Button, Form, Modal} from "antd";
import {ArrowRightOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import TablesOutput from "./tables-output/TablesOutput";
import {FormInstance} from "antd/es/form";
import ApplicationAnzanWrapper from "../_old/anzan/Anzan.layout";

interface ListProps {
    listForm: FormInstance;
    setting: SettingAnzanListProps;
    updateResultsTotals?: (answers: any[]) => void;
}

const List: React.FC<ListProps> = ({listForm, setting, updateResultsTotals}) => {
    const onFinishHandler = (values: any) => {
        Modal.confirm({
            icon: <ExclamationCircleOutlined/>,
            title: 'У вас еще есть время',
            onOk: () => updateResultsTotals && updateResultsTotals(values.answer)
        });
    };

    return <ApplicationAnzanWrapper>
        <Card>
            <Form form={listForm} onFinish={onFinishHandler}>
                <TablesOutput setting={setting}/>
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                    icon={<ArrowRightOutlined/>}
                >
                    Далее
                </Button>
            </Form>
        </Card>
    </ApplicationAnzanWrapper>;
};

export default List;