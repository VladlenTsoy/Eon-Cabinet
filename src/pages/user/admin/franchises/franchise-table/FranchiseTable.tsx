import React from "react";
import { LockOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import FranchiseTableDropdown from "./FranchiseTableDropdown";
import TableComponent from "../../../../../lib/components/table/Table";
import {Card, Image} from "lib/components";
import FranchiseTableExpanded from "./FranchiseTableExpanded";

const {Text} = Typography;

interface FranchiseTableProps {
    fetch: any;
    loader: boolean;
    setLoader: any;
}

const FranchiseTable: React.FC<FranchiseTableProps> = ({fetch, loader, setLoader}) => {
    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        render: (text: any, record: any) => record.status ? text :
            <Text type="danger">{text} <LockOutlined /></Text>,
        sorter: true,
    }, {
        title: 'Название',
        dataIndex: 'title',
        sorter: true,
    }, {
        title: 'Лого',
        dataIndex: 'url_image',
        render: (text: any) => <Image src={text} alt="Нет" width="40px"/>
    }, {
        title: 'Директор',
        dataIndex: 'director_id',
        render: (text: any, record: any) => record.director ?
            record.director :
            <Text type="secondary">Нет</Text>
    }, {
        title: 'Прайс',
        dataIndex: 'price',
        render: (text: any, record: any) =>
            record.price ? record.price.title : <Text type="secondary">Нет</Text>
    }, {
        render: (text: any, record: any) =>
            <FranchiseTableDropdown franchise={record} fetch={fetch}/>,
    }];

    const expandedRender = (record: any) => {
        return <FranchiseTableExpanded record={record}/>;
    };

    return <Card>
        <TableComponent
            columns={columns}
            url="admin/franchises/table"
            loader={loader}
            setLoader={setLoader}
            expandedRender={expandedRender}
        />
    </Card>;
};

export default FranchiseTable;