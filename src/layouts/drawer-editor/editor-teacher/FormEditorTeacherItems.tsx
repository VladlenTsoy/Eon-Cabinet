import React from "react";
import {FormItem, InputEmail, InputLogin, InputPassword, SelectData} from "../../components";
import {PlusOutlined} from '@ant-design/icons';
import {Col, DatePicker, Row} from "antd";
import SelectStatus from "./SelectStatus";
import InputPhoto from "../../components/form/InputPhoto";
import {useSelector} from "react-redux";
import EditorCenterButton from "../../../components/user/admin/franchise/center-table/EditorCenterButton";
import {FormInstance} from "antd/es/form";

interface FormEditorTeacherItemsProps {
    form: FormInstance;
    data: any;
    franchise_id?: any;
}

const FormEditorTeacherItems: React.FC<FormEditorTeacherItemsProps> = ({form, data, franchise_id}) => {
    const {user} = useSelector((state: any) => (state));
    const centerItems =
        <SelectData
            url={user.access === 'admin' ? `admin/centers/franchise/${franchise_id}` : 'director-franchise/centers'}
            name="center_id"
            label="Центр"
            requiredMsg="Выберите центр!"
            evtBtn={(update: any) =>
                <EditorCenterButton
                    title="Создать центр"
                    fetch={update}
                    isMouseDown={true}
                    franchise_id={franchise_id}
                >
                    <PlusOutlined/> Создать центр
                </EditorCenterButton>
            }
        />;

    return <Row gutter={15}>
        <Col span={24}>
            <SelectStatus/>
            <InputPhoto form={form}/>
        </Col>
        <Col span={12}>
            <FormItem name="first_name" label="Имя" requiredMsg="Введите имя!"/>
            <InputEmail/>
            <InputLogin/>
            {centerItems}
        </Col>
        <Col span={12}>
            <FormItem name="last_name" label="Фамилия" requiredMsg="Введите фамилию!"/>
            <FormItem name="phone" label="Телефон"/>
            <InputPassword user={data}/>
            <FormItem name="date_of_birth" label="Дата рождения">
                <DatePicker style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>
};

export default FormEditorTeacherItems;