import React, {useState} from "react";
import {Select, Form, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {FormItem} from "lib/ui";
import {categorySelector} from "store/access/teacher/category/categorySlice";
import {updateGroup} from "store/access/teacher/group/groups/updateGroup";
import {createGroup} from "store/access/teacher/group/groups/createGroup";
import {Group} from "../../../../../../../../../lib/types/teacher/Group";

const {Option} = Select;

interface FormItemsProps {
    group?: Group;
    close: () => void;
}

const FormItems: React.FC<FormItemsProps> = ({group, close}) => {
    const {categories} = useSelector(categorySelector);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        if (group)
            await dispatch(updateGroup({groupId: group.id, data: values}));
        else
            await dispatch(createGroup(values));

        close();
        setLoading(false);
    };

    return <Form
        layout="vertical"
        onFinish={onFinishHandler}
        initialValues={
            group ?
                {
                    title: group.title,
                    category_id: group.category.id,
                } : undefined
        }
    >
        <FormItem
            name="title"
            label="Название"
            requiredMsg="Введите название!"
        />
        <FormItem
            name="category_id"
            label="Категория"
            requiredMsg="Выберите категорию!"
        >
            <Select>
                {
                    categories
                        .map((category) =>
                            <Option key={category.id} value={category.id}>
                                {category.title}
                            </Option>
                        )
                }
            </Select>
        </FormItem>
        <div className="actions-block">
            <Button type="primary" htmlType="submit" loading={loading}>Сохранить</Button>
            <Button onClick={close}>Отмена</Button>
        </div>
    </Form>
};

export default FormItems;