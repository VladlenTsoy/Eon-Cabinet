import React, {useState} from 'react';
import {SaveOutlined} from '@ant-design/icons';
import {Button, Form, message} from "antd";
import CentersListBodyChangeCenter from "./CentersListBodyChangeCenter";
import CategoriesSelectCenter from "./CategoriesSelectCenter";
import {useParams} from "react-router";
import {LoadingBlock} from "lib";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {FormProps} from "antd/es/form";

const FormWrapper: React.FC<FormProps> = styled(Form)`
    margin-bottom: 0.5rem;
    
    .loading{
      width: 100%;
      display: flex;
      align-items: center;
    }
`;

interface ParamsProps {
    center_id: any
}

interface BodyChangeCenterTeacherProps {
    teacher: any;
    afterAction: any;
}

const BodyChangeCenterTeacher: React.FC<BodyChangeCenterTeacherProps> = (
    {
        teacher,
        afterAction
    }
) => {
    const {center_id} = useParams<ParamsProps>();
    const {api} = useSelector((state: any) => (state));
    const [centerId, setCenterId] = useState();
    const [currentCenterId] = useState(center_id);
    const [btnLoading, setButtonLoading] = useState(false);

    const [loading, categories] = useApiUserGeneral({url: `admin/categories/teacher/${teacher.id}`});

    const handlerChange = async (centerId: any) => {
        setCenterId(centerId);
    };

    const handlerSubmit = async (values: any) => {
        setButtonLoading(true);
        await api.user.post(`admin/teacher/${teacher.id}/center/transfer`, values);
        await afterAction();
        message.success("Вы успешно превели учителя в другой центр!");
    };

    return (
        <FormWrapper onFinish={handlerSubmit}>
            <CentersListBodyChangeCenter
                currentCenterId={currentCenterId}
                handlerChange={handlerChange}/>
            {
                loading ?
                    <div className="loading">
                        <LoadingBlock/>
                    </div> :
                    <CategoriesSelectCenter
                        teacher={teacher}
                        currentCenterId={currentCenterId}
                        centerId={centerId}
                        categoriesCurrentCenter={categories}
                    />
            }
            <Button type="primary" icon={<SaveOutlined/>} htmlType="submit" block loading={btnLoading}
                    disabled={!centerId || currentCenterId === centerId}>Сохранить</Button>
        </FormWrapper>
    );
};

export default BodyChangeCenterTeacher;