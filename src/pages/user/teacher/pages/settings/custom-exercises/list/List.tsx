import React, {useEffect} from 'react';
import {Navigation, NavigationButton, TablePagination} from "lib/ui";
import {Link} from "react-router-dom";
import {Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {ModalMenu} from "lib/ui";
import DeleteItem from "./Menu/delete-item/DeleteItem";
import PrintItem from "./Menu/print-item/PrintItem";
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store";
import {useSelector} from "react-redux";
import {customExercisesSelector} from "../../../../../../../store/access/teacher/custom-exercises/customExercisesSlice";
import {fetchCustomExercises} from "../../../../../../../store/access/teacher/custom-exercises/fetchCustomExercises";

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
    const {loading, exercises} = useSelector(customExercisesSelector)
    const dispatch = useTeacherDispatch()

    // teacher/custom-exercises/table
    useEffect(() => {
        const promise = dispatch(fetchCustomExercises())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <>
        <Navigation>
            <Link to={`/settings/custom-exercises/create`}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать примеры
                </NavigationButton>
            </Link>
        </Navigation>
        {/*<TablePagination columns={columns(() => null)} pagination={false} loading={loading} data={exercises} fetch={() => null}/>*/}
    </>;
};

export default List;