import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Typography, Button} from "antd";
import {UserImage} from "../../../../../layouts/components";
import moment from "moment";
import UsingTablePagination from "../../../../../layouts/components/table-pagination/usingTablePagination";
import EditorTeacherDrawer from "../../centers/more/editor-teacher-drawer/EditorTeacherDrawer";
import TeacherModalMenuItems from "../../centers/more/teacher-modal-menu-items/TeacherModalMenuItems";

const {Text} = Typography;

const columns = (fetch: any, pagination: any) => [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Фото',
        dataIndex: 'image',
        render: (text: any, record: any) =>
            <UserImage src={text} alt={record.first_name}/>
    },
    {
        title: 'Фамилия',
        dataIndex: 'last_name',
        sorter: true,
    },
    {
        title: 'Имя',
        dataIndex: 'first_name',
        sorter: true,
    },
    {
        title: 'Телефон',
        dataIndex: 'phone',
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        sorter: true,
    },
    {
        title: 'Осталось',
        dataIndex: 'left_test_days',
        render: (text: any) => text > 0 ? `${text} д.` : <Text type="danger">Заблокированный</Text>,
    },
    {
        title: 'Создание',
        dataIndex: 'created_at',
        render: (text: any) => text ? moment(text).format('DD/MM/YYYY') : 'Неизвестно',
        sorter: true,
    },
    {
        title: 'Активность',
        dataIndex: 'entrance_at',
        render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'Пусто',
        sorter: true,
    },
    {
        render: (text: any, record: any) =>
            <TeacherModalMenuItems
                record={record}
                pagination={pagination}
                fetch={fetch}
            />
    }
];

const tableHeader = (fetch: any) =>
    <EditorTeacherDrawer fetch={fetch}>
        <Button type="primary" icon={<PlusOutlined />}>
            Создать тестовый
        </Button>
    </EditorTeacherDrawer>;

const TestTeacherTable: React.FC = () => {
    return <UsingTablePagination
        url="/director-franchise/ending-test-teachers"
        columns={columns}
        tableHeader={tableHeader}
    />
};

export default TestTeacherTable;