import React, {useState} from 'react';
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {Navigation, TablePagination} from "../../lib";
import {Card} from "lib/index";

interface UsingTablePaginationProps<RecordType = any> {
    url: string;
    isPagination?: boolean;
    isSearch?: boolean;
    isCard?: boolean;
    columns: (fetch?: any, pagination?: any) => any[];
    header?: (fetch: any) => any[];
    tableHeader?: (fetch: any) => any;
}

const UsingTablePagination: React.FC<UsingTablePaginationProps> = (
    {
        url,
        isPagination = true,
        isSearch = true,
        isCard = true,
        columns,
        header,
        tableHeader,
    }
) => {
    const [pagination, setPagination] = useState<any>({pageIndex: 1, pageSize: 10, total: 0});

    // Вывод данных по @url
    const [loading, response, , fetch] = useApiUserGeneral({
        url: url,
        initValue: isPagination ? {total: 0} : [],
        config: {
            params: {
                results: pagination.pageSize,
                page: pagination.pageIndex,
            }
        },
        afterRequest: (response, params) =>
            isPagination ?
                setPagination({
                    ...pagination,
                    pageSize: params.results,
                    current: params.page,
                    field: params.sortField,
                    order: params.sortOrder,
                    total: response.total,
                    ...params,
                }) : null
    });

    const Wrapper = (child: any) => isCard ?
        <Card>{child}</Card> : child;

    return <>
        {header ?
            <Navigation>
                {header(fetch)}
            </Navigation> : null
        }
        {
            Wrapper(
                <TablePagination
                    isSearch={isSearch}
                    pagination={isPagination ? pagination : false}
                    loading={loading}
                    data={isPagination ? response.data : response}
                    fetch={fetch}
                    columns={columns(fetch, pagination)}
                    isCheckUser={true}
                >
                    {tableHeader ? tableHeader(fetch) : null}
                </TablePagination>
            )
        }
    </>;
};

export default UsingTablePagination;