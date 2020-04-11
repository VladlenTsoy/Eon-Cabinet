import React from "react";
import {FormItem, InputEmail, InputLogin, InputPassword, SelectData} from "../../../../../../layouts/components";
import {Col, DatePicker, Input, Row} from "antd";
import InputPhoto from "../../../../../../layouts/components/form/InputPhoto";

interface DirectorItemsProps {
    form: any;
    data: any;
    isFranchise?: boolean;
}

const DirectorItems: React.FC<DirectorItemsProps> = ({form, data, isFranchise}) => {
    return <Row gutter={15}>
        <Col span={24}>
            <InputPhoto form={form}/>
        </Col>
        <Col span={12}>
            <FormItem form={form} name="first_name" label="Имя" required="Введите имя!"/>
            <InputEmail form={form}/>
            <InputLogin form={form}/>
            {isFranchise ? null : <SelectData
                form={form}
                url="/admin/franchises"
                name="franchise_id"
                label="Франшиза"
                required="Выбреите франщизу!"/>}
        </Col>
        <Col span={12}>
            <FormItem form={form} name="last_name" label="Фамилия" required="Введите фамилию!"/>
            <FormItem form={form} name="phone" label="Телефон">
                <Input/>
            </FormItem>
            <InputPassword form={form} user={data}/>
            <FormItem form={form} name="date_of_birth" label="Дата рождения">
                <DatePicker style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>
};

export default DirectorItems;