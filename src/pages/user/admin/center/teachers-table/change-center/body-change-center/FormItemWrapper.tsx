import { PlusOutlined } from '@ant-design/icons';
import { Col, Divider, Empty, Select } from "antd";
import styled from "styled-components";
import React from "react";
import {FormItem} from "../../../../../../../lib/components";
import EditorCategoryButton from "../../../../settings/categories/EditorCategoryButton";

const {Option} = Select;

const EmptyWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

interface FormItemWrapper {
    fetch: any;
    loading: boolean;
    discipline: number;
    categoriesCurrentCenter: any;
    categories: any;
}

const FormItemWrapper: React.FC<FormItemWrapper> = ({fetch, loading, discipline, categoriesCurrentCenter, categories}) => {
    const categoriesForDiscipline = categoriesCurrentCenter.filter((category: any) => category.discipline_id === discipline);

    return categoriesForDiscipline.length ?
        categoriesForDiscipline.map((_category: any, _key: any) =>
            <Col xl={8} key={_key}>
                <FormItem
                    name={`categories[${_category.id}]`}
                    label={_category.title}
                    rules={[{required: _category.require, message: `Данная категория обязательна!`}]}
                >
                    <Select
                        loading={loading}
                        placeholder={`Категория для (${_category.title})`}
                        dropdownRender={menu => (
                            <div>
                                {menu}
                                <Divider style={{margin: '4px 0'}}/>
                                <EditorCategoryButton title="Создать категорию" fetch={fetch}>
                                    <div
                                        style={{padding: '4px 8px', cursor: 'pointer'}}
                                        onMouseDown={(e: any) => e.preventDefault()}
                                    >
                                        <PlusOutlined /> Создать категорию
                                    </div>
                                </EditorCategoryButton>
                            </div>
                        )}
                    >
                        {categories
                            .filter((category: any) => category.discipline_id === discipline)
                            .map((category: any, key: any) =>
                                <Option key={key} value={category.id}>{category.title}</Option>
                            )}
                    </Select>
                </FormItem>
            </Col>
        ) : <EmptyWrapper>
            <Empty/>
        </EmptyWrapper>;
};

export default FormItemWrapper;