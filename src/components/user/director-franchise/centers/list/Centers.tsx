import React from 'react';
import {NavigationButton} from "layouts/components";
import {Image} from "lib";
import {Link} from "react-router-dom";
import UsingTablePagination from "layouts/components/table-pagination/usingTablePagination";
import CenterModalMenu from "./center-modal-menu/CenterModalMenu";
import EditorCenterDrawer from "./editor-center-drawer/EditorCenterDrawer";
import {BarChartOutlined, PlusOutlined} from "@ant-design/icons";

const columns = (fetch: any, pagination: any) => [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
    },
    {
        title: 'Лого',
        dataIndex: 'url_image',
        render: (text: any) =>
            <Image src={text} alt="Нет" width="40px"/>
    },
    {
        title: 'Название',
        dataIndex: 'title',
        render: (text: any, record: any) =>
            <Link to={`/centers/${record.id}`}>{text}</Link>,
        sorter: true,
    },
    {
        title: 'Учителя',
        dataIndex: 'count_teachers.open',
    },
    {
        title: 'Ученики',
        dataIndex: 'count_students.open',
    },
    {
        render: (text: any, record: any) => <CenterModalMenu
            fetch={fetch}
            pagination={pagination}
            center={record}
        />
    }
];

const header = (fetch: any) => [
    <EditorCenterDrawer fetch={fetch} key="create">
        <NavigationButton type="primary" icon={<PlusOutlined/>}>
            Создать центр
        </NavigationButton>
    </EditorCenterDrawer>,
    <Link to="/centers/statistic" key="statistic">
        <NavigationButton type="primary" icon={<BarChartOutlined/>}>
            Статистика
        </NavigationButton>
    </Link>
];

const Centers: React.FC = () => {
    return <UsingTablePagination
        url="director-franchise/centers/table"
        columns={columns}
        header={header}
    />
};

export default Centers;