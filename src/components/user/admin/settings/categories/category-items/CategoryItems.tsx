import React, {useState} from "react";
import {FormItem} from "../../../../../../layouts/components";
import {Select, Radio} from "antd";
import {useSelector} from "react-redux";
import CategoryItemCenters from "./CategoryItemCenters";
import CategoryItemFranchise from "./CategoryItemFranchise";

const {Option} = Select;

interface CategoryItemsProps {
    form: any;
    isFranchise: boolean;
}

const CategoryItems: React.FC<CategoryItemsProps> = ({form, isFranchise}) => {
    const {app} = useSelector((state: any) => (state));
    const [type, setType] = useState(isFranchise ? 'franchise' : 'center');

    const handleTypeChange = (e: any) => setType(e.target.value);

    return <>
        <FormItem form={form} name="title" label="Название" required="Введите название!"/>
        <FormItem form={form} name="discipline_id" label="Дисциплина" required="Выберите дисциплину!">
            <Select>
                {app.disciplines.map((discipline: any, key: number) =>
                    <Option key={key} value={discipline.id}>{discipline.title}</Option>
                )}
            </Select>
        </FormItem>
        <Radio.Group onChange={handleTypeChange} defaultValue={type} buttonStyle="solid">
            <Radio.Button value="franchise">Франшиза</Radio.Button>
            <Radio.Button value="center">Центр</Radio.Button>
        </Radio.Group>
        {type === 'franchise' ?
            <CategoryItemFranchise form={form}/> :
            <CategoryItemCenters form={form}/>
        }
    </>
};

export default CategoryItems;