import React, {useState} from "react";
import {Navigation, NavigationButton,} from "../../../../../layouts/components";
import {Table} from "lib";
import EditorCityButton from "./EditorCityButton";
import { MenuOutlined } from '@ant-design/icons';
import CityTableDropdown from "./CityTableDropdown";

const Cities = () => {
    const [loader, setLoader] = useState(false);

    const fetchCities = () => {
        setLoader(true);
    };

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Название',
        dataIndex: 'title',
        sorter: true,
    }, {
        title: <MenuOutlined />,
        render: (text: any, record: any) => <CityTableDropdown record={record} fetch={fetchCities}/>,
    }];

    return <>
        <Navigation>
            <EditorCityButton fetch={fetchCities} title="Добавить город">
                <NavigationButton type="primary" icon="plus">
                    Добавить город
                </NavigationButton>
            </EditorCityButton>
        </Navigation>
        <Table
            columns={columns}
            url="/admin/cities/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default Cities;
