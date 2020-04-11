import React, {useState} from "react";
import {Table} from "lib";
import {Navigation, NavigationButton} from "../../../../../layouts/components";
import PriceTableDropdown from "./PriceTableDropdown";
import EditorPriceButton from "./EditorPriceButton";

const Prices = () => {
    const [loader, setLoader] = useState(false);

    const fetchPrice = () => {
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
        title: 'Студент',
        dataIndex: 'student',
        sorter: true,
    }, {
        title: 'Учитель',
        dataIndex: 'teacher',
        sorter: true,
    }, {
        render: (text: any, record: any) =>
            <PriceTableDropdown record={record} fetch={fetchPrice}/>,
    }];

    return <>
        <Navigation>
            <EditorPriceButton fetch={fetchPrice} title="Добавить цену">
                <NavigationButton type="primary" icon="plus">
                    Добавить цену
                </NavigationButton>
            </EditorPriceButton>
        </Navigation>
        <Table
            columns={columns}
            url="/admin/prices/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default Prices;
