import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../../store/reducers/common/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../../store/reducers/common/tasks/setting/reducer";
import TablesOutput from "../../../../layouts/application/list/tables-output/TablesOutput";
import Table from "./table/Table";
import {chunk} from "lodash";
import ApplicationCardLayout from "../../../../layouts/application/ApplicationCard.layout";
import {changeStats, changeStatus} from "../../../../../../../../store/reducers/common/game/gameSplice";
import {totalsChange} from "../../../../../../../../store/reducers/common/tasks/totals/action";

interface ListProps {
    checkHandler: (values: any) => any | {
        status: string;
        totals: any[] | {};
        stats: { all: number, success: number };
    };
}

const List: React.FC<ListProps> = ({checkHandler}) => {
    const totals = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);
    const dispatch = useDispatch();

    const [outputs, setOutputs] = useState();

    const submitHandler = (values: any) => {
        const {status, totals, stats} = checkHandler(values);

        dispatch(totalsChange(totals));
        dispatch(changeStats(stats));
        dispatch(changeStatus(status));
    };

    const createOutputs = useCallback((totals) => {
        return [chunk(Object.values(totals).map((total: any) => total.exercise.word), setting.column)];
    }, [setting]);

    useEffect(() => {
        const _outputs = createOutputs(totals);
        setOutputs(_outputs);
    }, [createOutputs, totals]);

    return <ApplicationCardLayout>
        <Form style={{width: '100%'}} onFinish={submitHandler}>
            {outputs && <TablesOutput
                outputs={outputs}
                listSetting={{
                    column: setting.column,
                    leftNumbering: true,
                    layout: Table
                }}
            />}
            <Button
                block
                type="primary"
                htmlType="submit"
                icon={<ArrowRightOutlined/>}
            >
                Далее
            </Button>
        </Form>
    </ApplicationCardLayout>;
};

export default List;