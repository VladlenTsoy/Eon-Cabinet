import React, {useState} from 'react';
import {FormItem} from "lib";
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Select, Form} from "antd";
import styled from "styled-components";

const {Option} = Select;

const Wrapper = styled.div`
  padding: 1rem;
  border: 1px dashed ${props => props.theme.light_color_border};
  border-radius: 10px;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  > .ant-form-item{
    width: 100%;
    margin-right: 1rem;
  }
  
  .ant-btn {
    margin-bottom: 28px;
  }
`;

const MultiWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  width: 100%;
  
  .ant-form-item{
    width: 100%;
  }
  margin-right: 1rem;
`;

interface FieldAlgorithmProps {
    setting: any;
    fieldId: number;
    isMultiplication: boolean;
}

const FieldAlgorithm: React.FC<FieldAlgorithmProps> = ({setting, fieldId, isMultiplication}) => {
    const [ids, setIds] = useState<any[]>([]);

    const addField = () => {
        setIds((prevState: any) => [...prevState, 1]);
    };

    const deleteHandler = (id: number) => {
        setIds((prevState: any) => prevState.filter((val: any, key: number) => key !== id));
    };

    return (
        <Wrapper>
            {ids.map((id, key) =>

                <FieldWrapper key={key}>
                    {
                        isMultiplication ?
                            <MultiWrapper>
                                <FormItem
                                    name={`step[${fieldId}][${key}].first`}
                                    label="Первое число"
                                    requiredMsg="Введите число!"
                                />
                                <FormItem
                                    name={`step[${fieldId}][${key}].sign`}
                                    label="Действие"
                                    requiredMsg="Выберите Действие!"
                                >
                                    <Select>
                                        <Option value="*" disabled={setting.mode === 'divide'}>×</Option>
                                        <Option value="/" disabled={setting.mode === 'multiply'}>÷</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    name={`step[${fieldId}][${key}].second`}
                                    label="Второе число"
                                    requiredMsg="Введите число!"
                                    // TODO - Значение по умолчанию
                                    // initialValue={setting.theme ? setting.theme : null}
                                />

                            </MultiWrapper> :
                            <FormItem
                                name={`step[${fieldId}][${key}]`}
                                label={`Шаг №${key + 1}`}
                                requiredMsg="Введите число!"
                            />
                    }
                    <Button type="danger" icon={<DeleteOutlined/>} disabled={key + 1 !== ids.length}
                            onClick={() => deleteHandler(key)}/>
                </FieldWrapper>
            )}
            <Form.Item>
                <Button type="dashed" icon={<PlusOutlined/>} onClick={addField} block>Добавить</Button>
            </Form.Item>
        </Wrapper>
    );
};

export default FieldAlgorithm;