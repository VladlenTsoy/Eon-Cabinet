import React, {useEffect} from "react";
import {FormItem, InputEmail, InputLogin, InputPassword, SelectData} from "lib";
import {PlusOutlined} from '@ant-design/icons';
import {Col, DatePicker, Row} from "antd";
import SelectStatus from "./SelectStatus";
import InputPhoto from "../../../lib/form/InputPhoto";
import EditorCenterButton from "../../../components/user/admin/franchise/center-table/EditorCenterButton";
import {FormInstance} from "antd/es/form";
import {useAppContext} from "../../../store/context/use-app-context";

interface FormEditorTeacherItemsProps {
    form: FormInstance;
    data: any;
    franchise_id?: any;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const FormEditorTeacherItems: React.FC<FormEditorTeacherItemsProps> = ({form, data, franchise_id, setIsSaveBtn}) => {
    const {user} = useAppContext();

    useEffect(() => {
        setIsSaveBtn(true);
    },[setIsSaveBtn]);

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