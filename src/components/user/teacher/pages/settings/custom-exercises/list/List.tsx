import React from 'react';
import {Navigation, NavigationButton} from "lib";
import {Link} from "react-router-dom";
import {Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import UsingTablePagination from "lib/table-pagination/usingTablePagination";
import {ModalMenu} from "lib";
import DeleteItem from "./Menu/delete-item/DeleteItem";
import PrintItem from "./Menu/print-item/PrintItem";

const columns = (fetch: any) => [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        defaultSortOrder: 'descend',
    },
    {
        title: 'Название',
        dataIndex: 'title',
    },
    {
        title: 'Описание',
        dataIndex: 'description',
    },
    {
        title: 'Упражнение',
        dataIndex: 'type_task',
        render: (text: any) =>
            text === 'basic' ?
                'Анзан' : 'Листы'
    },
    {
        title: 'Режим',
        dataIndex: 'mode',
        render: (text: any) =>
            <Tag color="processing">
                {
                    text === 'plus-minus' ?
                        '+ -' :
                        text === 'multiply' ?
                            '×' :
                            '÷'
                }
            </Tag>
    },
    {
        render: (text: any, record: any) =>
            <ModalMenu>
                {record.type_task === 'list' ? <PrintItem record={record}/> : null}
                {/*<div>*/}
                {/*    <EditOutlined/>*/}
                {/*    <span>Редактировать</span>*/}
                {/*</div>*/}
                <DeleteItem record={record} fetch={fetch}/>
            </ModalMenu>
    },

];

const List: React.FC = () => {
    return <>
        <Navigation>
            <Link to={`/settings/custom-exercises/create`}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать примеры
                </NavigationButton>
            </Link>
        </Navigation>
        <UsingTablePagination
            isSearch={false}
            url={`/teacher/custom-exercises/table`}
            columns={columns}
        />
    </>;
};

export default List;