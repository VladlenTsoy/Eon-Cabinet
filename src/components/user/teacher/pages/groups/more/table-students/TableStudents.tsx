import React from "react";
import {useScreenWindow} from "hooks/use-screen-window.effect";
import ColumnHomework from "./column-student/homework/ColumnHomework";
import TableStudentsLayout from "./table-layout/TableStudents.layout";
import ProfileColumn from "./column-student/profile/ProfileColumn";
import CoinsColumn from "./column-student/coins/CoinsColumn";
import ActionColumn from "./column-student/action/ActionColumn";

interface TableStudentsProps {
    users: any;
    selectUsersId: any[];
    selectUsers: any;
    loading: any;
    fetchUsers: any;
}

const TableStudents: React.FC<TableStudentsProps> = ({users, selectUsersId, selectUsers, loading, fetchUsers}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const columns = [
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            fixed: !isBreakpoint,
        },
        {
            title: 'Имя',
            fixed: !isBreakpoint,
            render: (text: any, record: any) =>
                <ProfileColumn student={record}/>,
        },
        {
            render: (text: any, record: any) =>
                <ActionColumn student={record} fetch={fetchUsers}/>
        },
        {
            title: 'Монеты',
            dataIndex: 'coins',
            render: (text: any) =>
                <CoinsColumn coins={text}/>
        },
        {
            title: 'Домашние задания',
            className: 'td-homework-table',
            render: (text: any, record: any) => <table>
                <tbody>
                <tr>
                    {record.homework ?
                        record.homework.map((homework: any) =>
                            <ColumnHomework homework={homework} key={homework.id} fetch={fetchUsers}/>) :
                        null}
                </tr>
                </tbody>
            </table>
        },
    ];

    const rowSelection = {
        selectedRowKeys: selectUsersId,
        onChange: (selectedRowKeys: any) => selectUsers(selectedRowKeys)
    };

    const checkRowClass = (record: any) => {
        if (record.is_blocked)
            return 'tr-student-block';
        return '';
    };

    return <TableStudentsLayout
        columns={columns}
        rowKey={(record: any) => record.id}
        scroll={{x: true}}
        dataSource={users}
        pagination={false}
        rowSelection={rowSelection}
        rowClassName={checkRowClass}
        loading={loading}
    />;
};

export default TableStudents;