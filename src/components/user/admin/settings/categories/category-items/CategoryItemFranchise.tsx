import React from 'react';
import {Select} from "antd";
import {FormItem} from "../../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";

const {Option} = Select;

interface CategoryItemFranchiseProps {
    form: any;
}

const CategoryItemFranchise: React.FC<CategoryItemFranchiseProps> = ({form}) => {
    const [loading, franchises] = useApiUserGeneral({url: 'admin/franchises'});

    return <FormItem form={form} name="franchise_id" label="Франшиза" required="Выберите франшизу!">
        <Select
            showSearch
            loading={loading}
            filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {franchises.map((franchise: any, key: number) =>
                <Option key={key} value={franchise.id}>{franchise.title}</Option>
            )}
        </Select>
    </FormItem>;
};

export default CategoryItemFranchise;