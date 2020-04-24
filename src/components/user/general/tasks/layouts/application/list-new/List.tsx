import React from 'react';
import {SettingAnzanListProps} from "store/tasks/setting/games-types/anzan.types";
import {Card} from "lib";
import {Button, Form} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import TablesOutput from "../list/card-list/tables-output/TablesOutput";

interface ListProps {
    setting: SettingAnzanListProps;
}

const List: React.FC<ListProps> = ({setting}) => {

    const onFinishHandler = (values: any) => {
        console.log(values);
    };

    return <Card>
        <Form onFinish={onFinishHandler}>
            <TablesOutput/>
            <Button
                block
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined/>}
            >
                Далее
            </Button>
        </Form>
    </Card>;
};

export default List;