import React, {useEffect} from "react";
import {FormItem, InputPhoto, InputEmail, InputLogin, InputPassword, SelectData} from "lib";
import {Col, DatePicker, Input, Row} from "antd";
import {FormInstance} from "antd/es/form";

interface DirectorItemsProps {
    form: FormInstance;
    data: any;
    isFranchise?: boolean;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const DirectorItems: React.FC<DirectorItemsProps> = ({form, data, isFranchise, setIsSaveBtn}) => {

    useEffect(() => {
        setIsSaveBtn(true);
    },[setIsSaveBtn]);

    return <Row gutter={15}>
        <Col span={24}>
            <InputPhoto form={form}/>
        </Col>
        <Col span={12}>
            <FormItem name="first_name" label="Имя" requiredMsg="Введите имя!"/>
            <InputEmail/>
            <InputLogin/>
            {isFranchise ? null : <SelectData
                url="/admin/franchises"
                name="franchise_id"
                label="Франшиза"
                requiredMsg="Выбреите франщизу!"/>}
        </Col>
        <Col span={12}>
            <FormItem name="last_name" label="Фамилия" requiredMsg="Введите фамилию!"/>
            <FormItem name="phone" label="Телефон">
                <Input/>
            </FormItem>
            <InputPassword user={data}/>
            <FormItem name="date_of_birth" label="Дата рождения">
                <DatePicker style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>
};

export default DirectorItems;