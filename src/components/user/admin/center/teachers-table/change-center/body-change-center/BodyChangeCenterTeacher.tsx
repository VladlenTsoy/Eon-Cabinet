import React, {useState} from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message } from "antd";
import { FormComponentProps } from '@ant-design/compatible/es/form';
import CentersListBodyChangeCenter from "./CentersListBodyChangeCenter";
import CategoriesSelectCenter from "./CategoriesSelectCenter";
import {withRouter, RouteComponentProps} from "react-router";
import {LoadingBlock} from "lib";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";

const FormWrapper = styled(Form)`
    margin-bottom: 0.5rem;
    
    .loading{
      width: 100%;
      display: flex;
      align-items: center;
    }
`;

interface BodyChangeCenterTeacherProps {
    teacher: any;
    afterAction: any;
}

const BodyChangeCenterTeacher: React.FC<BodyChangeCenterTeacherProps & FormComponentProps & RouteComponentProps<{ center_id: any }>> = (
    {
        form,
        match,
        teacher,
        afterAction
    }
) => {
    const {api} = useSelector((state: any) => (state));
    const [centerId, setCenterId] = useState();
    const [currentCenterId] = useState(match.params.center_id);
    const [btnLoading, setButtonLoading] = useState(false);

    const [loading, categories] = useApiUserGeneral({url: `admin/categories/teacher/${teacher.id}`});

    const handlerChange = async (centerId: any) => {
        setCenterId(centerId);
    };

    const handlerSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            if (!err) {
                setButtonLoading(true);
                await api.user_general.post(`admin/teacher/${teacher.id}/center/transfer`, values);
                await afterAction();
                message.success("Вы успешно превели учителя в другой центр!");
            }
        });
    };

    return (
        <FormWrapper onSubmit={handlerSubmit}>
            <CentersListBodyChangeCenter
                form={form}
                currentCenterId={currentCenterId}
                handlerChange={handlerChange}/>
            {
                loading ?
                    <div className="loading">
                        <LoadingBlock/>
                    </div> :
                    <CategoriesSelectCenter
                        form={form}
                        teacher={teacher}
                        currentCenterId={currentCenterId}
                        centerId={centerId}
                        categoriesCurrentCenter={categories}
                    />
            }
            <Button type="primary" icon={<SaveOutlined />} htmlType="submit" block loading={btnLoading}
                    disabled={!centerId || currentCenterId === centerId}>Сохранить</Button>
        </FormWrapper>
    );
};

export default Form.create<FormComponentProps & BodyChangeCenterTeacherProps>()(withRouter(BodyChangeCenterTeacher));