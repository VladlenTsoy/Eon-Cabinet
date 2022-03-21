import React, {useState} from "react";
import {Select, Form} from "antd";
import {FormItem, Button} from "lib/ui";
import {updateGroup} from "store/group/updateGroup";
import {createGroup} from "store/group/createGroup";
import {Group} from "../../../../../../../../../lib/types/teacher/Group";
import {useDispatch} from "store/store";
import {useSelectAllCategories} from "store/category/categorySelectors";

const {Option} = Select;

interface FormItemsProps {
    group?: Group;
    close: () => void;
}

const FormItems: React.FC<FormItemsProps> = ({group, close}) => {
    const categories = useSelectAllCategories();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const onFinishHandler = async (values: any) => {
        setLoading(true)
        if (group)
            await dispatch(updateGroup({groupId: group.id, data: values}))
        else
            await dispatch(createGroup(values))
        setLoading(false)
        close()
    }

    return <Form
        size="large"
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
            <Button type="primary" htmlType="submit" size="large" loading={loading} block>Сохранить</Button>
        </div>
    </Form>
};

export default FormItems;
