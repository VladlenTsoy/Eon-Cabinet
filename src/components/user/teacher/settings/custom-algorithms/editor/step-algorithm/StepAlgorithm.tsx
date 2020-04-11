import React, {useState} from 'react';
import { PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, message } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import styled from "styled-components";
import FieldAlgorithm from "./field-algorithm/FieldAlgorithm";
import {useDispatch, useSelector} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {appChangeCustomAlgorithms} from "../../../../../../../store/app/actions";

const StepWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 1rem;
  gap: 1rem;
  
  .block-add{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    border-radius: 10px;
    color: ${props => props.theme.color_minimal};
    border: 2px dashed ${props => props.theme.light_color_border};
    font-size: 25px;
    cursor: pointer;
    flex-direction: column;
    
    i{
      font-size: 50px;
    }
    
    p{
      margin: 0;
    }
  }
`;

type StepAlgorithmProps = FormComponentProps & {
    setting: any;
}

const StepAlgorithm: React.FC<RouteComponentProps & StepAlgorithmProps> = ({form, history, setting}) => {
    const [loading, setLoading] = useState(false);
    const [ids, setIds] = useState<any[]>([]);
    const {api} = useSelector((state: any) => (state));
    const dispatch = useDispatch();
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    const addHandler = () => {
        setIds((prevState: any) => [...prevState, 1]);
    };

    const submitHandler = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                const response = await api.user_general.post('/teacher/custom-algorithms', {...values, setting});
                dispatch(appChangeCustomAlgorithms(response.data));
                message.success('Вы успешно добавили алгоритмы!');
                history.push('/settings/custom-algorithms');
            }
        });
    };

    return (
        <Form onSubmit={submitHandler}>
            <StepWrapper>
                {ids.map((id: any, key) =>
                    <FieldAlgorithm
                        form={form}
                        isMultiplication={isMultiplication}
                        fieldId={key}
                        key={key}
                        setting={setting}
                    />
                )}
                <div className="block-add" onClick={addHandler}>
                    <PlusCircleOutlined />
                    <p>Добавить алгоритм</p>
                </div>
            </StepWrapper>
            <Button
                type="primary"
                icon={<SaveOutlined />}
                block
                size="large"
                loading={loading}
                htmlType="submit"
            >
                Сохранить
            </Button>
        </Form>
    );
};

export default Form.create<StepAlgorithmProps>()(withRouter(StepAlgorithm));