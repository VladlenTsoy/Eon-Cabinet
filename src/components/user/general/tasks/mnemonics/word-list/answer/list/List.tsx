import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form} from "antd";
import {ArrowRightOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import TablesOutput from "../../../../layouts/application/application-output/list/tables-output/TablesOutput";
import Table from "./table/Table";
import {chunk} from "lodash";
import ApplicationCardLayout from "../../../../layouts/application/application-output/ApplicationCard.layout";
import {changeStats, changeStatus, changeTotals,gameSelector} from "../../../../../../../../store/reducers/common/game/gameSplice";
import {useScreenWindow} from "../../../../../../../../effects/use-screen-window.effect";

interface ListProps {
    checkHandler: (values: any) => any | {
        status: string;
        totals: any[] | {};
        stats: { all: number, success: number };
    };
}

const List: React.FC<ListProps> = ({checkHandler}) => {
    const {totals} = useSelector(gameSelector);
    const dispatch = useDispatch();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const [column] = useState(isBreakpoint ? 2 : 5);

    const [outputs, setOutputs] = useState();

    const submitHandler = (values: any) => {
        const {status, totals, stats} = checkHandler(values);

        dispatch(changeTotals(totals));
        dispatch(changeStats(stats));
        dispatch(changeStatus(status));
    };

    const createOutputs = useCallback((totals) => {
        return [chunk(Object.values(totals).map((total: any) => total.exercise.word), column)];
    }, [column]);

    useEffect(() => {
        const _outputs = createOutputs(totals);
        setOutputs(_outputs);
    }, [createOutputs, totals]);

    return <ApplicationCardLayout>
        <Form style={{width: '100%'}} onFinish={submitHandler}>
            {outputs && <TablesOutput
                outputs={outputs}
                listSetting={{
                    column: column,
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