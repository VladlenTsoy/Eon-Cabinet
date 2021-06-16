import React from 'react';
import {Form, Select} from "antd";
import {useApiUserGeneral} from "../../../../../../../../../../../effects/use-api-user-general.effect";

const {Option} = Select;

interface CategoryItemProps {
    categories: any[];
}

const CategoryItem: React.FC<CategoryItemProps> = () => {
    const [loading, data,] = useApiUserGeneral({url: '/teacher/custom-exercises-categories', initValue: []})

    return <Form.Item name="category_id">
        <Select loading={loading} size="large">
            {data.map((category: any) => <Option value={category.id} key={category.id}>{category.title}</Option>)}
        </Select>
    </Form.Item>;
};

export default React.memo(CategoryItem);