import React, {useEffect, useRef, useState} from "react";
import {Table} from 'antd';
import HeaderTable from "./Header";
import {Card} from "lib";
import {useApiUserGeneral} from "../../effects/use-api-user-general.effect";

const Wrapper: React.FC<any> = ({card, children}) => card ? <Card>{children}</Card> : <>{children}</>;

interface TableProps {
    columns: any;
    onRow?: any;
    url: string;
    access?: string;
    search?: boolean;
    rowKey?: string;
    loader?: boolean;
    setLoader?: (loader: boolean) => void;
    isCheckClass?: boolean;
    checkClass?: any;
    expandedRender?: any;
    scroll?: any;
    header?: any;
    card?: boolean;
}

// TODO - возможно заменить на usingTable
const TableComponent: React.FC<TableProps> = (
    {
        columns,
        onRow,
        url,
        loader,
        search = true,
        setLoader,
        isCheckClass,
        expandedRender,
        scroll,
        header,
        card
    }
) => {
    const [pagination, setPagination] = useState({pageIndex: 1, pageSize: 10, total: 0,});
    const [timer, setTimer] = useState<any>(0);
    const searchInput = useRef<any>(null);

    const [loading, response, , fetch] = useApiUserGeneral({
        url,
        initValue: {total: 0},
        config: {
            params: {
                results: pagination.pageSize,
                page: pagination.pageIndex,
            }
        },
        afterRequest: (response) =>
            setPagination({...pagination, total: response.total})
    });

    useEffect(() => {
        if (loader)
            (async () => {
                await fetch({
                    results: pagination.pageSize,
                    page: pagination.pageIndex,
                });
                if (setLoader)
                    setLoader(false)
            })();
    }, [loader, fetch, pagination, setLoader]);

    const handleTableChange = async (_pagination: any, filters: any, sorter: any, data: {}, search?: any) => {
        await fetch({
            results: _pagination.pageSize,
            page: _pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            search: search,
            ...filters,
        });
    };

    const searchOnTable = () => {
        clearTimeout(timer);
        let search = searchInput.current.state.value;
        setTimer(setTimeout(() => handleTableChange(pagination, {}, {}, {}, search), 1000));
    };

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

    return <Wrapper card={card}>
        {search ?
            <HeaderTable search={searchOnTable} searchInput={searchInput}>
                {header}
            </HeaderTable> :
            null}
        <Table
            onRow={onRow}
            scroll={scroll || {x: true}}
            expandedRowRender={expandedRender}
            rowClassName={isCheckClass ? checkRowClass : undefined}
            columns={columns}
            rowKey={(record: any) => record.id}
            dataSource={response.data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
            size="small"
        />
    </Wrapper>
};

export default TableComponent;