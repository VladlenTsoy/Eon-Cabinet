import React, {useState} from 'react';
import {Navigation, NavigationButton} from "../../../../../layouts/components";
import CategoriesTable from "./categories-table/CategoriesTable";
import EditorCategoryButton from "./EditorCategoryButton";
import {PlusOutlined} from "@ant-design/icons";

const CategoriesFromFranchise: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const fetch = () => {
        setLoading(true);
    };

    return <>
        <Navigation>
            <EditorCategoryButton fetch={fetch} title="Создать категорию">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать категорию
                </NavigationButton>
            </EditorCategoryButton>
        </Navigation>
        <CategoriesTable fetch={fetch} loader={loading} setLoader={setLoading}/>
    </>
};

export default CategoriesFromFranchise;