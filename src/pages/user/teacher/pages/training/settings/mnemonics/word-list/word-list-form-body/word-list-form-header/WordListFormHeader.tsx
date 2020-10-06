import React from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Col, Row, Select, Form} from "antd";
import {FormItem} from "../../../../../../../../../../lib/ui";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../../../../../../hooks/use-screen-window.effect";
import {useLanguage} from "../../../../../../../../../../hooks/use-language";

const {Option} = Select;

const CounterWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
`;

interface WordListFormHeaderProps {
    addSetting: any;
}

const WordListFormHeader: React.FC<WordListFormHeaderProps> = ({addSetting}) => {
    const [isBreakpoint] = useScreenWindow({breakpoint: 'md'});
    const {l} = useLanguage();

    const submitHandler = (values: any) => {
        addSetting(values);
    };

    return (
        <Form
            onFinish={submitHandler}
            id="form-setting-word-list"
            layout="vertical"
            initialValues={{
                mode: 0,
                type: 0,
                count: 5,
            }}
        >
            <Row gutter={15}>
                <Col xl={7} md={8} xs={12}>
                    <FormItem
                        name="mode"
                        label={l('mode')}
                        requiredMsg="Выберите режим!"
                    >
                        <Select>
                            {l('tasksTraining').wordsList.mode.map((type: string, key: number) =>
                                <Option value={key} key={key}>{type}</Option>
                            )}
                        </Select>
                    </FormItem>
                </Col>
                <Col xl={7} md={8} xs={12}>
                    <FormItem
                        name="type"
                        label={l('type')}
                        requiredMsg="Выберите тип!"
                    >
                        <Select>
                            {l('tasksTraining').wordsList.type.map((type: string, key: number) =>
                                <Option value={key} key={key}>{type}</Option>
                            )}
                        </Select>
                    </FormItem>
                </Col>
                <Col xl={10} md={8} xs={24}>
                    <CounterWrapper>
                        <FormItem
                            name="count"
                            label={l('qty')}
                            requiredMsg="Введите кол-во!"
                            marginBottom="0"
                        >
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
                            block={isBreakpoint}
                            icon={<PlusOutlined/>}
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

export default WordListFormHeader;