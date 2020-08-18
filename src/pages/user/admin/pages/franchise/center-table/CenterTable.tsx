import React from "react";
import TableComponent from "../../../../../../lib/components/table/Table";
import {Card, Image} from "lib/components";
import {LockOutlined} from '@ant-design/icons';
import {Typography} from "antd";
import moment from "moment";
import CenterTableDropdown from "./CenterTableDropdown";

const {Text} = Typography;

interface CenterTableProps {
    id: any;
    fetch: any;
    loader: boolean;
}

const CenterTable: React.FC<CenterTableProps> = ({id, fetch, loader}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            defaultSortOrder: 'descend',
            render: (text: any, record: any) => record.status ? text :
                <Text type="danger">{text} <LockOutlined/></Text>,
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
            title: 'Город',
            render: (text: any, record: any) => record.city,
        }, {
            title: 'Учителей',
            dataIndex: ['number_of_teachers', 'open'],
        }, {
            title: 'Учеников',
            dataIndex: ['number_of_students', 'open'],
        }, {
            title: 'Создан',
            dataIndex: 'created_at',
            render: (text: any) => `${text ? moment(text).format('DD/MM/YY') : 'Неизвестно'}`,
            sorter: true,
        }, {
            render: (text: any, record: any) =>
                <CenterTableDropdown center={record} fetch={fetch} franchise_id={id}/>,
        }
    ];

    return <Card>
        <TableComponent columns={columns} url={`admin/centers/franchise/${id}/table`} loader={loader}
                        setLoader={fetch}/>
    </Card>
};

export default CenterTable;