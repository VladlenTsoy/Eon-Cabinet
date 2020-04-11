import React from 'react';
import {Select} from "antd";
import {FormItem} from "../../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";

const {Option, OptGroup} = Select;

interface CategoryItemCentersProps {
    form: any;
}

const CategoryItemCenters: React.FC<CategoryItemCentersProps> = ({form}) => {
    const [loading, centers] = useApiUserGeneral({url: 'admin/centers/all'});

    return <FormItem form={form} name="center_id" label="Центр" required="Выберите центр!">
        <Select
            showSearch
            loading={loading}
            filterOption={(input: any, option: any) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            {!loading ? Object.keys(centers).map((franchise: any, key: any) =>
                <OptGroup label={franchise} key={key}>
                    {centers[franchise].map((center: any) =>
                        <Option
                            value={center.id}
                            key={center.id}>
                            {center.title}
                        </Option>
                    )}
                </OptGroup>
            ) : null}
        </Select>
    </FormItem>;
};

export default CategoryItemCenters;