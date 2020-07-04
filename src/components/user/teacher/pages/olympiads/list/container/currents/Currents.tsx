import React, {useEffect} from 'react';
import {ButtonLink, Card, TablePagination} from "../../../../../../../../lib";
import LeftToOlympiad
    from "../../../../../../../../_components/teacher/olympiads/card-olympiad/left-to-olympiad/LeftToOlympiad";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/reducers/teacher/olympiad/olympiadSlice";
import {fetchCurrentOlympiads} from "../../../../../../../../store/reducers/teacher/olympiad/fetchCurrentOlympiads";
import TagAccess from "../../../../../../../../_components/teacher/olympiads/card-olympiad/tag-access/TagAccess";

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
            render: (text: any) => <TagAccess access={text}/>
        },
        {
            title: 'До следующего',
            dataIndex: ['current_step', 'end_at'],
            render: (text: any) => <LeftToOlympiad end={text}/>
        },
        {
            render: (text: any, record: any) =>
                <ButtonLink type="link" to={`olympiad/${record.id}`}>Подробнее </ButtonLink>
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