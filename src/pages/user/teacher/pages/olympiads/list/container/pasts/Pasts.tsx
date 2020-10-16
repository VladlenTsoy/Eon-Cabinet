import React, {useCallback, useEffect} from 'react';
import {Button, Card, TablePagination} from "../../../../../../../../lib/ui";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/access/teacher/olympiad/olympiadSlice";
import {fetchPastOlympiads} from "../../../../../../../../store/access/teacher/olympiad/past/fetchPastOlympiads";
import OlympiadTagAccess from "../../../../../../../../lib/components/olympiad-tag-access/OlympiadTagAccess";
import {momentFormatCheckYear} from "../../../../../../../../utils/momentFormatCheckYear";
import ProfileColumn from "../../../../groups/more/container/table-students/default-columns/profile/ProfileColumn";
import {useUser} from "../../../../../../../../hooks/use-user";

const Pasts: React.FC = () => {
    const {user} = useUser();
    const {past} = useSelector(olympiadSelector);
    const dispatch = useDispatch();

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
            title: 'Участвовало',
            dataIndex: 'students_count',
        },
        {
            title: 'Чемпион',
            dataIndex: 'students_count',
            render: () => <ProfileColumn student={user}/>
        },
        {
            title: 'Доступ',
            dataIndex: 'access',
            render: (text: any) => <OlympiadTagAccess access={text}/>
        },
        {
            title: 'Дата завершения',
            dataIndex: ['last_step', 'end_at'],
            render: (text: any) => momentFormatCheckYear(text, 'DD MMM', 'DD.MM.YYYY')
        },
        {
            render: (text: any, record: any) =>
                <Button type="link" to={`olympiad/${record.id}`}>Подробнее </Button>
        }
    ];

    const fetch = useCallback((pagination: any) => dispatch(fetchPastOlympiads(pagination)), [dispatch]);
    
    useEffect(() => {
        const promise = fetch({pageIndex: 1});
        return () => {
            promise.abort();
        }
    }, [fetch]);

    return <Card>
        <TablePagination
            columns={columns}
            pagination={{
                pageIndex: past.pageIndex,
                total: past.total,
            }}
            loading={past.loading}
            data={past.data}
            fetch={fetch}
        />
    </Card>
};

export default Pasts;