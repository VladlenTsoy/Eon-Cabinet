import React from "react";
import {NavigationButton, UserImage} from "../../../../lib";
import { EyeInvisibleOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import {Link} from "react-router-dom";
import moment from "moment";
import DirectorModalMenuItems from "./director-modal-menu-items/DirectorModalMenuItems";
import EditorDirectorDrawer from "./editor-director-drawer/EditorDirectorDrawer";
import UsingTablePagination from "../../../../lib/table-pagination/usingTablePagination";

const {Text} = Typography;

const columns = (fetch: any, pagination: any) => [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        render: (text: any, record: any) => <>
            {text}
            {record.delete_id ? <Text type="danger"><EyeInvisibleOutlined /></Text> : null}
            {record.is_blocked ? <Text type="danger"><LockOutlined /></Text> : null}
        </>
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
        title: 'Франшиза',
        dataIndex: 'franchise',
        render: (text: string, record: any) =>
            <Link to={`/franchises/${record.franchise_id}`}>{text}</Link>
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        sorter: true,
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
    }, {
        render: (text: any, record: any) =>
            <DirectorModalMenuItems
                record={record}
                fetch={fetch}
                pagination={pagination}
            />
    }
];

const header = (fetch: any) =>
    [
        <EditorDirectorDrawer key="editor" fetch={fetch}>
            <NavigationButton type="primary" icon={<PlusOutlined/>}>
                Создать директора
            </NavigationButton>
        </EditorDirectorDrawer>
    ];

const Directors: React.FC = () => {
    return <UsingTablePagination
        url="/admin/franchise-directors/table"
        columns={columns}
        header={header}
    />;
};

export default Directors;
