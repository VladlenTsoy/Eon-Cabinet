import * as React from "react";
import {Select} from "antd";
import {useSelector} from "react-redux";
import {FormItem} from "../../components";

const {Option} = Select;

interface FormEditorGroupProps {
    form: React.Ref<any>;
    data: any;
}

const FormEditorGroupItems: React.FC<FormEditorGroupProps> = () => {
    const {app} = useSelector((state: any) => state);
    const {disciplines, categories} = app;

    //
    const searchCategoryById = (discipline_id: number, method: 'filter' | 'find') => {
        return categories[method]((category: any) => Number(category.discipline_id) === Number(discipline_id));
    };

    //
    const changeDiscipline = (value: number) => {
        if (categories.length) {
            const category = searchCategoryById(value, 'find');
            // form.setFieldsValue({
            //     category_id: String(category.id),
            // });
        }
    };

    return <>
        <FormItem
            name="title"
            required="Введите название!"
        />
        <FormItem
            name="method_id"
            label="Метод"
            required="Выберите дисциплину!"
        >
            <Select onChange={changeDiscipline}>
                {disciplines.map((discipline: any) =>
                    <Option key={discipline.id} value={discipline.id}>{discipline.title}</Option>)}
            </Select>
        </FormItem>
        <FormItem
            name="category_id"
            label="Категория"
            required="Выберите категорию!"
        >
            <Select>
                {/*{searchCategoryById(form.getFieldValue('method_id'), 'filter')*/}
                {/*    .map((category: any) => <Option key={category.id} value={category.id}>{category.title}</Option>)}*/}
            </Select>
        </FormItem>
    </>
};

export default FormEditorGroupItems;