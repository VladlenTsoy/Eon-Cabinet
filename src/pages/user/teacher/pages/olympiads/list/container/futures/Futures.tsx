import React, {useEffect, useState} from 'react';
import {ButtonLink, Card, TablePagination} from "../../../../../../../../lib/ui";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/access/teacher/olympiad/olympiadSlice";
import {fetchFutureOlympiads} from "../../../../../../../../store/access/teacher/olympiad/future/fetchFutureOlympiads";
import OlympiadTagAccess from "../../../../../../../../lib/components/olympiad-tag-access/OlympiadTagAccess";
import {momentFormatCheckYear} from "../../../../../../../../utils/momentFormatCheckYear";

const Futures: React.FC = () => {
    const {future} = useSelector(olympiadSelector);
    const dispatch = useDispatch();
    const [pagination] = useState<any>({pageIndex: 1, pageSize: 10, total: 0});

    useEffect(() => {
        const promise = dispatch(fetchFutureOlympiads());
        return () => {
            promise.abort();
        }
    } , [dispatch]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: 'Название',
            dataIndex: 'title',
        },
        {
            title: 'Этапов',
            dataIndex: 'steps_count'
        },
        {
            title: 'Доступ',
            dataIndex: 'access',
            render: (text: any) => <OlympiadTagAccess access={text}/>
        },
        {
            title: 'Дата начало',
            dataIndex: ['current_step', 'start_at'],
            render: (text: any) => momentFormatCheckYear(text, 'HH:mm DD MMM', 'HH:mm DD.MM.YYYY')
        },
        {
            render: (text: any, record: any) =>
                <ButtonLink type="link" to={`olympiad/${record.id}`}>Подробнее </ButtonLink>
        }
    ];

    return <Card>
        <TablePagination columns={columns} pagination={pagination} loading={future.loading} data={future.data}
                         fetch={() => null}/>
    </Card>

    // return <Spin spinning={future.loading} tip="Загрузка...">
    //     {future.data.map((olympiad) =>
    //         <Card key={olympiad.id}>
    //             <p>{olympiad.title}</p>
    //             <p>Доступ: {olympiad.access === 'public' ?
    //                 <Tag color="#5cb860">Открытый</Tag> :
    //                 olympiad.access === 'invite' ?
    //                     <Tag color="#ff9800">Запрос</Tag> :
    //                     <Tag color="#f55a4e">Закрытый</Tag>}
    //             </p>
    //             <p>Дата начало: {olympiad.current_step.start_at}</p>
    //             <p>Этапов : <span>{olympiad.steps_count}</span></p>
    //             <ButtonLink
    //                 block
    //                 type="default"
    //                 to={`olympiad/${olympiad.id}`}
    //             >
    //                 Подробнее
    //             </ButtonLink>
    //         </Card>
    //     )}
    // </Spin>;
};

export default Futures;