import React from 'react';
import {EditOutlined, MenuOutlined} from '@ant-design/icons';
import {ModalMenu} from "lib";
import moment from "moment";
import {Link} from "react-router-dom";
import MoreHomeworkDrawer from "./more-homework/MoreHomeworkDrawer";
import DeleteHomework from "./DeleteHomework";
import UsingTablePagination from "layouts/components/table-pagination/usingTablePagination";

interface TableHomeworkProps {
    discipline_id: number;
    category_id: number;
}

const TableHomework: React.FC<TableHomeworkProps> = ({discipline_id, category_id}) => {
    const columns = (fetch: any) => [
        {
            title: 'Создано',
            dataIndex: 'created_at',
            sorter: true,
            defaultSortOrder: 'descend',
            render: (text: any) => moment(text).format('DD/MM/YYYY')
        },
        {
            title: 'Уровень',
            dataIndex: 'level',
            sorter: true,
            render: (text: string) => <span>Уровень {text}</span>
        },
        {
            title: 'Описание',
            dataIndex: 'description',
        },
        {
            title: <MenuOutlined/>,
            render: (text: string, record: any) => menu(record, fetch)
        }
    ];

    const menu = (homework: any, fetch: any) => (
        <ModalMenu>
            <MoreHomeworkDrawer homework={homework}/>
            <Link to={`homework/${homework.id}`}>
                <EditOutlined/> Редактировать
            </Link>
            <DeleteHomework homework={homework} setLoading={fetch}/>
        </ModalMenu>
    );

    return <UsingTablePagination
        url={`/teacher/homework/${discipline_id}/${category_id}`}
        columns={columns}
    />
};

export default TableHomework;