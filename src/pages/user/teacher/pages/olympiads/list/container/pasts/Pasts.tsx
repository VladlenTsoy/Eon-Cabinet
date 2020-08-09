import React, {useCallback, useEffect} from 'react';
import {ButtonLink, Card, TablePagination} from "../../../../../../../../lib/components";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/access/teacher/olympiad/olympiadSlice";
import {fetchPastOlympiads} from "../../../../../../../../store/access/teacher/olympiad/fetchPastOlympiads";
import TagAccess from "../../../../../../../../_components/teacher/olympiads/card-olympiad/tag-access/TagAccess";
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
            render: (text: any) => <TagAccess access={text}/>
        },
        {
            title: 'Дата завершения',
            dataIndex: ['last_step', 'end_at'],
            render: (text: any) => momentFormatCheckYear(text, 'DD MMM', 'DD.MM.YYYY')
        },
        {
            render: (text: any, record: any) =>
                <ButtonLink type="link" to={`olympiad/${record.id}`}>Подробнее </ButtonLink>
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