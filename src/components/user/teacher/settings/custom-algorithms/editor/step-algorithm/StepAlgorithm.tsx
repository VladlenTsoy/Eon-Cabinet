import React, {useState} from 'react';
import {PlusCircleOutlined, SaveOutlined} from '@ant-design/icons';
import {Button, message, Form} from 'antd';
import styled from "styled-components";
import FieldAlgorithm from "./field-algorithm/FieldAlgorithm";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
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

type StepAlgorithmProps = {
    setting: any;
}

const StepAlgorithm: React.FC<StepAlgorithmProps> = ({setting}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [ids, setIds] = useState<any[]>([]);
    const {api} = useSelector((state: any) => (state));
    const dispatch = useDispatch();
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    const addHandler = () => {
        setIds((prevState: any) => [...prevState, 1]);
    };

    const submitHandler = async (values: any) => {
                setLoading(true);
                const response = await api.user_general.post('/teacher/custom-algorithms', {...values, setting});
                dispatch(appChangeCustomAlgorithms(response.data));
                message.success('Вы успешно добавили алгоритмы!');
                history.push('/settings/custom-algorithms');
    };

    return (
        <Form onFinish={submitHandler}>
            <StepWrapper>
                {ids.map((id: any, key) =>
                    <FieldAlgorithm
                        isMultiplication={isMultiplication}
                        fieldId={key}
                        key={key}
                        setting={setting}
                    />
                )}
                <div className="block-add" onClick={addHandler}>
                    <PlusCircleOutlined/>
                    <p>Добавить алгоритм</p>
                </div>
            </StepWrapper>
            <Button
                type="primary"
                icon={<SaveOutlined/>}
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

export default StepAlgorithm;