import React from "react";
import {Divider, Select} from "antd";
import {FormItem} from "../../index";
import {useApiUserGeneral} from "../../../../effects/use-api-user-general.effect";

const {Option} = Select;

interface SelectDataProps {
    url: string;
    name: string;
    label: string;
    required?: string;
    rules?: string;
    evtBtn?: any;
    optRender?: any;
}

const SelectData: React.FC<SelectDataProps> = (
    {
        url,
        name,
        label,
        required,
        rules,
        evtBtn,
        optRender
    }
) => {
    const [loading, data, , update] = useApiUserGeneral({url, initValue: []});

    const filter = (input: any, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    const DropdownData = ({menu, fetch}: any) =>
        <>
            {menu}
            <Divider style={{margin: '4px 0'}}/>
            <div style={{padding: '8px', cursor: 'pointer'}}>
                {evtBtn(fetch)}
            </div>
        </>;

    return <FormItem name={name} label={label} required={required} rules={rules}>
        <Select
            showSearch
            loading={loading}
            optionFilterProp="children"
            filterOption={filter}
            {...evtBtn ? {
                dropdownRender: menu => <DropdownData menu={menu} fetch={update}/>
            } : null}
        >
            {!loading ?
                data.map((item: any) =>
                    <Option key={item.id} value={item.id}>{optRender ? optRender(item) : item.title}</Option>) :
                null}
        </Select>
    </FormItem>;
};

export default SelectData;