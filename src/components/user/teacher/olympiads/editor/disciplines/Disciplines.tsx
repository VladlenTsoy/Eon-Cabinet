import React from 'react';
import styled from "styled-components";
import { ArrowRightOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Row, Select } from "antd";
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import {Card, FormItem} from "lib";
import {useSelector} from "react-redux";

const {Option} = Select;

const DisciplinesWrapper = styled(Row)`
  height: 100%;
`;

type DisciplinesProps = FormComponentProps & {
    setDiscipline: (discipline: number) => void;
}

const Disciplines: React.FC<DisciplinesProps> = ({form, setDiscipline}) => {
    const {app} = useSelector((state: any) => state);

    const submitHandler = (e:any) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setDiscipline(values.discipline_id);
            }
        })
    };

    return (
        <DisciplinesWrapper align="middle"  justify="center">
            <Col xl={8} md={12} xs={24}>
                <Card>
                    <Card.Title title="Создание олимпиады" level={3}/>
                    <p>Выберите дисциплину в которой будет проводиться олимпиада.</p>
                    <Form onSubmit={submitHandler}>
                        <FormItem form={form} name="discipline_id" label="Диспиплина" required="Выберите дисциплину!">
                            <Select>
                                {
                                    app.disciplines.map(function (discipline: any, key: number) {
                                        return <Option key={key} value={discipline.id}>{discipline.title}</Option>;
                                    })
                                }
                            </Select>
                        </FormItem>
                        <Button icon={<ArrowRightOutlined />} type="primary" htmlType="submit" block>Далее</Button>
                    </Form>
                </Card>
            </Col>
        </DisciplinesWrapper>
    );
};

export default Form.create<DisciplinesProps>()(Disciplines);