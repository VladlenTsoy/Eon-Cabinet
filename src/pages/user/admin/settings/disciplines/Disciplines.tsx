import React from "react";
import {Table} from "lib/components";
import {Card} from "lib/components";

const columns = [{
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'descend',
    sorter: true,
}, {
    title: 'Название',
    dataIndex: 'title',
    sorter: true,
}];

const Disciplines:React.FC = () => {
    return <>
        <Card>
            <Table columns={columns} url="disciplines"/>
        </Card>
    </>
};

export default Disciplines;
