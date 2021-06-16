import React, {useState} from 'react';
import {Navigation, NavigationButton, Spin} from "lib";
import {Link} from "react-router-dom";
import {Button, Tabs, Tag} from "antd";
import {PlusOutlined, EditOutlined} from "@ant-design/icons";
import UsingTablePagination from "lib/table-pagination/usingTablePagination";
import {ModalMenu} from "lib";
import {useScreenWindow} from "effects/use-screen-window.effect";
import DeleteItem from "./Menu/delete-item/DeleteItem";
import PrintItem from "./Menu/print-item/PrintItem";
import EditItem from "./Menu/edit-item/EditItem";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
import EditorCategory from "./editor-category/EditorCategory";
import styled from "styled-components";

const {TabPane} = Tabs;

const TitleStyled = styled.span`
  
  .icon{
    margin-left: 0.5rem;
    
    .anticon {
      font-size: 16px;
      margin: 0;
    }
  }
`

const List: React.FC = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const [updateCategoryId, setUpdateCategoryId] = useState(null)
    const [loading, data, , fetch] = useApiUserGeneral({url: '/teacher/custom-exercises-categories', initValue: []})

    const columns = (fetch: any, pagination: any) => [
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
                    <EditItem record={record} fetch={fetch} categories={data} setUpdateCategoryId={setUpdateCategoryId} pagination={pagination}/>
                    {record.type_task === 'list' ? <PrintItem record={record}/> : null}
                    <DeleteItem record={record} fetch={fetch} pagination={pagination}/>
                </ModalMenu>
        },
    ];

    return <>
        <Navigation>
            <Link to={`/settings/custom-exercises/create`}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать примеры
                </NavigationButton>
            </Link>
        </Navigation>
        <Spin spinning={loading}>
            <Tabs
                tabPosition={isBreakpoint ? 'top' : 'left'}
                style={{minHeight: '200px'}}
                tabBarExtraContent={
                    <EditorCategory fetch={fetch} title="Создать категорию">
                        <Button icon={<PlusOutlined/>}>Создать категорию</Button>
                    </EditorCategory>
                }
            >
                {data.map((category: any) =>
                    <TabPane
                        tab={
                            <TitleStyled>
                                {category.title}
                                <span className="icon">
                                    <EditorCategory fetch={fetch} category={category} title="Изменить категорию">
                                        <EditOutlined/>
                                    </EditorCategory>
                                </span>
                            </TitleStyled>
                        }
                        key={`category-${category.id}`}
                    >
                        <UsingTablePagination
                            autoUpdate={category.id === updateCategoryId}
                            isSearch={false}
                            url={`/teacher/custom-exercises/${category.id}/table`}
                            columns={columns}
                        />
                    </TabPane>
                )}

                <TabPane tab="Без категории" key={`no-category`}>
                    <UsingTablePagination
                        isSearch={false}
                        url={`/teacher/custom-exercises/table`}
                        columns={columns}
                    />
                </TabPane>
            </Tabs>
        </Spin>
    </>;
};

export default List;