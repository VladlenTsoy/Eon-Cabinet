import React from 'react';
import {Table} from 'antd';
import HeaderTablePagination from "./header/HeaderTablePagination";

const checkRowClass = (record: any) => {
    if (record.is_blocked)
        return 'center-stats-teacher-block';
    else if (record.status === 'test') {
        if (record.left_test_days <= 0)
            return 'center-stats-teacher-test-error';
        else
            return 'center-stats-teacher-test';
    }
    return '';
};

interface TablePaginationProps {
    isSearch?: boolean,
    columns: any[],
    pagination: any,
    loading: boolean,
    data: any[],
    fetch: (pagination: any) => void,
    isCheckUser?: boolean,
}

const TablePagination: React.FC<TablePaginationProps> = (
    {
        children,
        isSearch,
        columns,
        pagination,
        loading,
        data,
        fetch,
        isCheckUser,
    }
) => {

    // Выбор другой страницы в таблице
    const handleTableChange = async (pagination: any, filters: any, sorter: any, data: {}, search?: any) => {
        await fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            search: search,
            ...filters,
        });
    };

    return <>
        {isSearch ?
            <HeaderTablePagination
                pagination={pagination}
                handleTableChange={handleTableChange}
            >
                {children}
            </HeaderTablePagination>
        : null}

        <Table
            scroll={{x: true}}
            pagination={pagination}
            columns={columns}
            loading={loading}
            dataSource={data}
            onChange={handleTableChange}
            rowClassName={isCheckUser ? checkRowClass : undefined}
            rowKey={(record: any) => record.id}
        />
    </>;
};

export default TablePagination;