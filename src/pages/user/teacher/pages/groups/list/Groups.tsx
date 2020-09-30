import React, {useCallback} from 'react';
import NavButtons from "./nav-buttons/NavButtons";
import Container from "./container/Container";
import Tab from "../../../../../../lib/components/tabs/Tab";
import Tabs from "../../../../../../lib/components/tabs/Tabs";
import {
    useActiveCategoryId,
    useSelectAllCategories
} from "../../../../../../store/access/teacher/category/categorySelectors";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";
import {changeActiveCategoryId} from 'store/access/teacher/category/categorySlice'
import styled from "styled-components"

const GroupsStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Groups: React.FC = () => {
    const dispatch = useTeacherDispatch()
    const activeCategoryId = useActiveCategoryId()
    const categories = useSelectAllCategories();

    const changeActiveCategory = useCallback((key: string) => {
        const id = key.replace('category-', '')
        dispatch(changeActiveCategoryId(Number(id)))
    }, [dispatch])

    return <GroupsStyled>
        <NavButtons/>
        <Tabs defaultValue={activeCategoryId ? `category-${activeCategoryId}` : null} onChange={changeActiveCategory}>
            {categories
                .map((category) =>
                    <Tab title={category.title} key={`category-${category.id}`}>
                        <Container categoryId={category.id}/>
                    </Tab>
                )
            }
        </Tabs>

    </GroupsStyled>
};

export default Groups;