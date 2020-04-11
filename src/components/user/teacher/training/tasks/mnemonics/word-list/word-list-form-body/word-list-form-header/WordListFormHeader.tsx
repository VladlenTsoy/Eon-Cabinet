import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Row, Select } from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";
import styled from "styled-components";
import {useSelector} from "react-redux";

const {Option} = Select;

const CounterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  
  .ant-form-item{
    margin: 0 15px 0 0;
  }
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
   
    .ant-form-item{
      margin: 0;
    }
  }
  
  .ant-btn{
    margin-bottom: 5px;
  }
`;

interface WordListFormHeaderProps {
    form: any;
    addSetting: any;
}

const WordListFormHeader: React.FC<WordListFormHeaderProps> = ({form, addSetting}) => {
    const {language} = useSelector((state: any) => state);
    const {common} = language;

    const submitHandler = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err)
                addSetting(values);
        });
    };

    return (
        <Form onSubmit={submitHandler} id="form-setting-word-list">
            <Row  gutter={15}>
                <Col xl={7} md={8} xs={12}>
                    <FormItem form={form} name="mode" initialValue={0} label={common.mode} required="Выберите режим!">
                        <Select>
                            {common.tasksTraining.wordsList.mode.map((type: string, key: number) =>
                                <Option value={key} key={key}>{type}</Option>
                            )}
                        </Select>
                    </FormItem>
                </Col>
                <Col xl={7}  md={8}  xs={12}>
                    <FormItem form={form} name="type" initialValue={0} label={common.type} required="Выберите тип!">
                        <Select>
                            {common.tasksTraining.wordsList.type.map((type: string, key: number) =>
                                <Option value={key} key={key}>{type}</Option>
                            )}
                        </Select>
                    </FormItem>
                </Col>
                <Col xl={10} md={8} xs={24}>
                    <CounterWrapper>
                        <FormItem form={form} name="count" initialValue={5} label={common.qty} required="Введите кол-во!"
                                  marginBottom="0">
                            <Select>
                                <Option value={5}>{5}</Option>
                                <Option value={10}>{10}</Option>
                                <Option value={15}>{15}</Option>
                                <Option value={20}>{20}</Option>
                                <Option value={25}>{25}</Option>
                                <Option value={30}>{30}</Option>
                                <Option value={35}>{35}</Option>
                                <Option value={40}>{40}</Option>
                                <Option value={50}>{50}</Option>
                                <Option value={60}>{60}</Option>
                            </Select>
                        </FormItem>
                        <Button
                            ghost
                            block
                            icon={<PlusOutlined />}
                            type="primary"
                            htmlType="submit"
                            form="form-setting-word-list"
                        >
                            Добавить
                        </Button>
                    </CounterWrapper>
                </Col>
            </Row>
        </Form>
    );
};

export default Form.create<WordListFormHeaderProps>()(WordListFormHeader);