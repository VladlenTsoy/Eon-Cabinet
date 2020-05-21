import React from 'react';
import styled from "styled-components";
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button, Form, Col, Row, Select} from "antd";
import {Card, FormItem} from "lib";
import {useSelector} from "react-redux";

const {Option} = Select;

const DisciplinesWrapper = styled(Row)`
  height: 100%;
`;

type DisciplinesProps = {
    setDiscipline: (discipline: number) => void;
}

const Disciplines: React.FC<DisciplinesProps> = ({setDiscipline}) => {
    const {app} = useSelector((state: any) => state);

    const submitHandler = (values: any) => {
        setDiscipline(values.discipline_id);
    };

    return (
        <DisciplinesWrapper align="middle" justify="center">
            <Col xl={8} md={12} xs={24}>
                <Card>
                    <Card.Title title="Создание олимпиады" level={3}/>
                    <p>Выберите дисциплину в которой будет проводиться олимпиада.</p>
                    <Form onFinish={submitHandler} layout="vertical">
                        <FormItem name="discipline_id" label="Диспиплина" requiredMsg="Выберите дисциплину!">
                            <Select>
                                {
                                    app.disciplines.map(function (discipline: any, key: number) {
                                        return <Option key={key} value={discipline.id}>{discipline.title}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                        <Button icon={<ArrowRightOutlined/>} type="primary" htmlType="submit" block>Далее</Button>
                    </Form>
                </Card>
            </Col>
        </DisciplinesWrapper>
    );
};

export default Disciplines;