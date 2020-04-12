import React, {useEffect} from "react";
import {Col, DatePicker, Row} from "antd";
import InputPhoto from "../../components/form/InputPhoto";
import {FormItem, InputEmail, InputLogin, InputPassword} from "../../components";
import SelectData from "../../components/form/select-data/SelectData";
import {FormInstance} from "antd/es/form";

interface FormEditorStudentProps {
    form: FormInstance,
    close: any;
    group_id?: string;
    data?: any;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const FormEditorStudent: React.FC<FormEditorStudentProps> = (
    {
        form,
        group_id,
        data,
        setIsSaveBtn,
    }
) => {

    useEffect(() => {
        setIsSaveBtn(true);
    },[setIsSaveBtn]);

    return <Row gutter={15}>
        <Col span={24}>
            <InputPhoto form={form}/>
        </Col>
        <Col sm={12} xs={24}>
            <FormItem
                name="first_name"
                label="Имя"
                required="Введите имя!"
            />
            <InputEmail/>
            <InputLogin/>
            {group_id ?
                <SelectData
                    url={`teacher/field/groups/${group_id}`}
                    label="Группа"
                    name="group_id"
                    required="Выберите группу!"
                /> : null}
        </Col>
        <Col sm={12} xs={24}>
            <FormItem
                name="last_name"
                label="Фамилия"
                required="Введите фамилию!"
            />
            <FormItem
                name="phone"
                label="Телефон"
            />
            <InputPassword
                user={data}
            />
            <FormItem
                name="date_of_birth"
                label="Дата рождения"
            >
                <DatePicker style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>
};

export default FormEditorStudent;