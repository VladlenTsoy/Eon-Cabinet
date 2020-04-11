import React, {useState} from 'react';
import { EditOutlined, MenuOutlined } from '@ant-design/icons';
import {ModalMenu, Table} from "lib";
import moment from "moment";
import {Link} from "react-router-dom";
import MoreHomeworkDrawer from "./more-homework/MoreHomeworkDrawer";
import DeleteHomework from "./DeleteHomework";

interface TableHomeworkProps {
    discipline_id: number;
    category_id: number;
}

const TableHomework: React.FC<TableHomeworkProps> = ({discipline_id, category_id}) => {
    const [loading, setLoading] = useState(false);

    const columns = [
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
            title: <MenuOutlined />,
            render: (text: string, record: any) => menu(record)
        }
    ];

    const menu = (homework: any) => (
        <ModalMenu>
            <MoreHomeworkDrawer homework={homework}/>
            <Link to={`homework/${homework.id}`}>
                <EditOutlined /> Редактировать
            </Link>
            <DeleteHomework homework={homework} setLoading={setLoading}/>
        </ModalMenu>
    );

    return <Table
        card
        loader={loading}
        setLoader={setLoading}
        columns={columns}
        url={`/teacher/homework/${discipline_id}/${category_id}`}
        rowKey="id"/>;
};

export default TableHomework;