import React, {useState} from 'react';
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {Navigation, TablePagination} from "../index";
import {Card} from "lib";

interface UsingTablePaginationProps {
    url: string;
    isSearch?: boolean;
    isCard?: boolean;
    columns: (fetch?: any, pagination?: any) => any[];
    header?: (fetch: any) => any[];
    tableHeader?: (fetch: any) => any;
}

const UsingTablePagination: React.FC<UsingTablePaginationProps> = (
    {
        url,
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
        initValue: {total: 0},
        config: {
            params: {
                results: pagination.pageSize,
                page: pagination.pageIndex,
            }
        },
        afterRequest: (response, params) =>
            setPagination({
                ...pagination,
                pageSize: params.results,
                current: params.page,
                field: params.sortField,
                order: params.sortOrder,
                total: response.total,
                ...params,
            })
    });

    const Wrapper = (child: any) => isCard ? <Card>{child}</Card> : child;

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
                    pagination={pagination}
                    loading={loading}
                    data={response.data}
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