import React from "react";
import {Select} from "antd";
import {FormItem} from "../../index";
import {useApiUserGeneral} from "../../../../effects/use-api-user-general.effect";

const {Option} = Select;

interface SelectDisciplinesProps {
    form: any;
    url: string;
    label: string;
    name: string;
    required?: string;
    rules?: string;
}

const SelectData: React.FC<SelectDisciplinesProps> = ({form, url, label, name, required, rules}) => {
    const [loading, data] = useApiUserGeneral({url, initValue: []});

    const filter = (input: any, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return <FormItem form={form} name={name} label={label} required={required} rules={rules}>
        <Select
            showSearch
            loading={loading}
            optionFilterProp="children"
            filterOption={filter}
        >
            {data.length ?
                data.map((item: any) =>
                    <Option key={item.id} value={item.id}>
                        {item.title}
                    </Option>) :
                null}
        </Select>
    </FormItem>
};

export default SelectData;