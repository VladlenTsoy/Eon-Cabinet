import React from 'react';
import {NavigationButton, UserImage} from "../../../../../layouts/components";
import EditorTeacherDrawer from "./editor-teacher-drawer/EditorTeacherDrawer";
import { MenuOutlined } from '@ant-design/icons';
import { Badge } from "antd";
import moment from "moment";
import UsingTablePagination from "../../../../../layouts/components/table-pagination/usingTablePagination";
import {useChangeActionNavbar} from "../../../../../effects/use-change-action-navbar.effect";
import {useChangeTitle} from "../../../../../effects/use-change-title.effect";
import TeacherModalMenuItems from "./teacher-modal-menu-items/TeacherModalMenuItems";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";
import styled from "styled-components";

const UserImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const columns = (fetch: any, pagination: any, centerId: string) => [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
    }, {
        title: 'Имя',
        dataIndex: 'last_name',
        sorter: true,
        render: (text: any, record: any) =>
            <UserImageWrapper>
                <UserImage src={record.image} alt={record.first_name} mr="0.5rem"/>
                {record.last_name} {record.first_name}
            </UserImageWrapper>
    }, {
        title: 'Телефон',
        dataIndex: 'phone',
    },
    {
        title: 'Статус',
        filterMultiple: false,
        dataIndex: 'status',
        filters: [
            {text: <Badge status="success" text="Активный"/>, value: 'active'},
            {text: <Badge status="processing" text="Тестовый"/>, value: 'test'},
            {text: <Badge status="warning" text="Заблокирован"/>, value: 'block'},
        ],
        render: (text: any, record: any) => record.is_blocked ?
            <Badge status="warning" text="Заблокирован"/> :
            record.status === 'test' ?
                <Badge status="processing" text={text > 0 ? `${record.left_test_days} д.` : 'Заблокирован'}/> :
                <Badge status="success" text="Активный"/>
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        sorter: true,
    }, {
        title: 'Создание',
        dataIndex: 'created_at',
        render: (text: any) => text ? moment(text).format('DD/MM/YYYY') : 'Неизвестно',
        sorter: true,
    }, {
        title: 'Студентов',
        dataIndex: 'students',
        render: (text: any) => text.open
    }, {
        title: 'Активность',
        dataIndex: 'entrance_at',
        render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'Пусто',
        sorter: true,
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) =>
            <TeacherModalMenuItems
                record={record}
                centerId={centerId}
                fetch={fetch}
                pagination={pagination}
            />,
    }
];

const header = (fetch: any, centerId: string) =>
    [
        <EditorTeacherDrawer key="editor" fetch={fetch} center_id={centerId}>
            <NavigationButton type="primary" icon="plus">
                Создать учителя
            </NavigationButton>
        </EditorTeacherDrawer>
    ];


/**
 * Center more information page
 * @param match
 * @constructor
 */
const Center: React.FC<any> = ({match}) => {
    const [loading, center] = useApiUserGeneral({url: `director-franchise/center/${match.params.id}`});

    useChangeTitle({title: !loading ? `Центр: ${center.title}` : 'Центр: Загрузка...'});
    useChangeActionNavbar({action: 'back'});

    const _header = (fetch: any) => header(fetch, match.params.id);
    const _columns = (fetch: any, pagination: any) => columns(fetch, pagination, match.params.id);

    return <UsingTablePagination
        url={`director-franchise/teachers/center/${match.params.id}`}
        columns={_columns}
        header={_header}
    />;
};

export default Center;