import React, {useState} from "react";
import {Navigation, NavigationButton} from "../../../../../layouts/components";
import {Table} from "lib";
import EditorCountryButton from "./EditorCountryButton";
import { MenuOutlined } from '@ant-design/icons';
import CountryTableDropdown from "./CountryTableDropdown";

const Countries = () => {
    const [loader, setLoader] = useState(false);

    const fetchCountries = () => {
        setLoader(true);
    };

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Страна',
        dataIndex: 'country',
        sorter: true,
    }, {
        title: 'Столица',
        dataIndex: 'capital',
        sorter: true,
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) => <CountryTableDropdown record={record} fetch={fetchCountries}/>,
    }];

    return <>
        <Navigation>
            <EditorCountryButton fetch={fetchCountries} title="Добавить страну">
                <NavigationButton type="primary" icon="plus">
                    Добавить страну
                </NavigationButton>
            </EditorCountryButton>
        </Navigation>
        <Table
            columns={columns}
            url="admin/countries/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default Countries;
