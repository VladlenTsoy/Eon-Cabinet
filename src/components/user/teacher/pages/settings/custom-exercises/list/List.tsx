import React from 'react';
import {Navigation, NavigationButton} from "layouts/components";
import {Link} from "react-router-dom";
import {Tabs, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import UsingTablePagination from "lib/table-pagination/usingTablePagination";
import {ModalMenu} from "lib";
import {useSelector} from "react-redux";
import {useScreenWindow} from "effects/use-screen-window.effect";
import DeleteItem from "./Menu/delete-item/DeleteItem";
import PrintItem from "./Menu/print-item/PrintItem";

const {TabPane} = Tabs;

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
    const {app} = useSelector((state: any) => state);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return <>
        <Navigation>
            <Link to={`/settings/custom-exercises/create`}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать примеры
                </NavigationButton>
            </Link>
        </Navigation>
        <Tabs tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}}>
            {app.categories.filter((category: any) => category.discipline_id === 1)
                .map((category: any) =>
                    <TabPane tab={category.title} key={`category-${category.id}`}>
                        <UsingTablePagination
                            isSearch={false}
                            url={`/teacher/custom-exercises/${category.id}/table`}
                            columns={columns}
                        />
                    </TabPane>
                )}
        </Tabs>
    </>;
};

export default List;