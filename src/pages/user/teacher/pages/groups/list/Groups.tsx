import React from 'react';
import NavButtons from "./nav-buttons/NavButtons";
import Container from "./container/Container";
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../../store/access/teacher/category/categorySlice";
import Tab from "../../../../../../lib/components/tabs/Tab";
import Tabs from "../../../../../../lib/components/tabs/Tabs";

const Groups: React.FC = () => {
    const {categories} = useSelector(categorySelector);

    return <>
        <NavButtons/>
        <Tabs>
            {categories
                .map((category) =>
                    <Tab title={category.title} key={`category-${category.id}`}>
                        <Container categoryId={category.id}/>
                    </Tab>
                )
            }
        </Tabs>

    </>
};

export default Groups;