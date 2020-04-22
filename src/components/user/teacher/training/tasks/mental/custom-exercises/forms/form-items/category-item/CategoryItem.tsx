import React from 'react';
import {Form, Radio} from "antd";
import {useSelector} from "react-redux";
import styled from "styled-components";

const RadioStyleWrapper = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
  
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
    }
  }
`;

interface CategoryItemProps {
    categories: any[];
}

const CategoryItem: React.FC<CategoryItemProps> = ({categories}) => {
    const {app} = useSelector((state: any) => state);
    const defCategories = app.categories;

    return <Form.Item name="category_id">
        <RadioStyleWrapper size="large">
            {
                defCategories.filter((category: any) => category.discipline_id === 1)
                    .map((category: any) =>
                        <Radio.Button
                            key={category.id}
                            value={category.id}
                            disabled={!categories.includes(String(category.id))}
                        >
                            {category.title}
                        </Radio.Button>
                    )
            }
        </RadioStyleWrapper>
    </Form.Item>;
};

export default React.memo(CategoryItem);