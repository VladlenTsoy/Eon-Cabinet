import React, {useEffect} from 'react';
import {Button, Card, TablePagination} from "../../../../../../../../lib/ui";
import LeftToOlympiad
    from "../../../../../../../../lib/components/olympiad-timer-left/OlympiadTimerLeft";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "store/olympiad/olympiadSlice";
import {fetchCurrentOlympiads} from "store/olympiad/current/fetchCurrentOlympiads";
import OlympiadTagAccess from "../../../../../../../../lib/components/olympiad-tag-access/OlympiadTagAccess";

const Currents: React.FC = () => {
    const {current} = useSelector(olympiadSelector);
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'title',
        },
        {
            title: 'Этап',
            render: (_: any, render: any) => `${render.current_step.step + 1} из ${render.steps_count}`
        },
        {
            title: 'Участвующих',
            dataIndex: 'students_count',
        },
        {
            title: 'Доступ',
            dataIndex: 'access',
            render: (text: any) => <OlympiadTagAccess access={text}/>
        },
        {
            title: 'До следующего',
            dataIndex: ['current_step', 'end_at'],
            render: (text: any) => <LeftToOlympiad end={text}/>
        },
        {
            render: (text: any, record: any) =>
                <Button type="link" to={`olympiad/${record.id}`}>Подробнее </Button>
        }
    ];

    useEffect(() => {
        const promise = dispatch(fetchCurrentOlympiads());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    return <Card>
        <TablePagination
            columns={columns}
            pagination={false}
            loading={current.loading} data={current.data}
            fetch={() => null}
        />
    </Card>
};

export default Currents;
