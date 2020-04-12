import React from "react";
import {Select} from "antd";
import {FormItem} from "../../index";
import {useApiUserGeneral} from "../../../../effects/use-api-user-general.effect";

const {Option} = Select;

interface SelectDisciplinesProps {
    url: string;
    label: string;
    name: string;
    requiredMsg?: string;
    rules?: any;
}

const SelectData: React.FC<SelectDisciplinesProps> = ({url, label, name, requiredMsg, rules}) => {
    const [loading, data] = useApiUserGeneral({url, initValue: []});

    const filter = (input: any, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    return <FormItem name={name} label={label} requiredMsg={requiredMsg} rules={rules}>
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