import React, {useState} from "react";
import {Navigation, NavigationButton} from "../../../../../../lib/components";
import {Table} from "lib/components";
import CategoryTableDropdown from "./CategoryTableDropdown";
import EditorCategoryButton from "./EditorCategoryButton";

const Categories = () => {
    const [loader, setLoader] = useState(false);

    const fetchCategory = () => {
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
        title: 'Дисциплина',
        dataIndex: 'discipline',
    }, {
        title: 'Центр',
        dataIndex: 'center',
    }, {
        title: 'Франшиза',
        dataIndex: 'franchise',
    },{
        render: (text: any, record: any) =>
            <CategoryTableDropdown record={record} fetch={fetchCategory}/>,
    }];

    return <>
        <Navigation>
            <EditorCategoryButton title="Добавить категорию" fetch={fetchCategory}>
                <NavigationButton type="primary" icon="plus">
                    Добавить категорию
                </NavigationButton>
            </EditorCategoryButton>
        </Navigation>
        <Table
            columns={columns}
            url="/admin/categories/table"
            loader={loader}
            setLoader={setLoader}
            card={true}
        />
    </>
};

export default Categories;
