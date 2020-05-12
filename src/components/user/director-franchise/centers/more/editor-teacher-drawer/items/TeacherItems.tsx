import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {FormItem, InputEmail, InputLogin, InputPassword, SelectData} from "../../../../../../../layouts/components";
import EditorCenterButton from "../../../../../admin/franchise/center-table/EditorCenterButton";
import {PlusOutlined} from '@ant-design/icons';
import {Col, DatePicker, Row} from "antd";
import SelectStatus from "../../../../../../../layouts/drawer-editor/editor-teacher/SelectStatus";
import InputPhoto from "../../../../../../../layouts/components/form/InputPhoto";
import {FormInstance} from "antd/es/form";

interface TeacherItemsProps {
    form: FormInstance;
    franchise_id: any;
    data: any;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const TeacherItems: React.FC<TeacherItemsProps> = (
    {
        form,
        franchise_id,
        data,
        setIsSaveBtn,
    }
) => {
    const {user} = useSelector((state: any) => (state));

    useEffect(() => {
        setIsSaveBtn(true);
    }, [setIsSaveBtn]);

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

export default TeacherItems;