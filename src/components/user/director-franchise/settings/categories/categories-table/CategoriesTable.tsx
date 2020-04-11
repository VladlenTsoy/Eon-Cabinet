import React from 'react';
import TableComponent from "../../../../../../lib/table/Table";
import {Card} from "lib";
import { MenuOutlined } from '@ant-design/icons';
import { Alert } from "antd";
import CategoriesTableDropdown from "./CategoriesTableDropdown";

interface CategoriesTableProps {
    fetch: any;
    loader: any;
    setLoader: any;
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({loader, setLoader, fetch}) => {


    const Columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Название',
            dataIndex: 'title',
        },
        {
            title: 'Дисциплина',
            dataIndex: 'discipline',
        },
        {
            title: <MenuOutlined />,
            render: (text: any, record: any) => <CategoriesTableDropdown fetch={fetch} category={record}/>
        }
    ];

    return <Card>
        <Alert type="info" message="Данные категории будут установленны по умолчанию новым центрам!"/>
        <br/>
        <TableComponent
            columns={Columns}
            url="/director-franchise/categories"
            loader={loader}
            setLoader={setLoader}
        />
    </Card>;
};

export default CategoriesTable;