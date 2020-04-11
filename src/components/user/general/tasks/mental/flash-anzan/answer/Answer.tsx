import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Input, Row, Typography } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "lib";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "store/game/actions";

const {Title} = Typography;

const Answer: React.FC<any> = ({form}) => {
    const {game} = useSelector((state: any) => state);
    const {getFieldDecorator} = form;
    const dispatch = useDispatch();
    const {totals, stats} = game;

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                let _stats = stats;
                let _totals = totals.map((total: any, key: number) => {
                    if (total.answer === Number(values.user[key]))
                        _stats = {..._stats, success: _stats.success + 1};

                    return {
                        ...total, ...{
                            user: Number(values.user[key]),
                            result: total.answer === Number(values.user[key])
                        }
                    };
                });

                dispatch(gameChangeStats(_stats));
                dispatch(gameChangeTotals(_totals));
                dispatch(gameChangeStatus('result'));
            }
        });
    };

    return <Row  justify="center" align="middle" gutter={15}>
        <Col xl={8}>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Title level={3}>Введите ответ</Title>
                    {totals.map((total: any, key: any) =>
                        <Form.Item key={key}>
                            {getFieldDecorator(`user[${key}]`, {})(
                                <Input placeholder={`Ваш ответ №${key + 1}`} autoFocus={key === 0}/>
                            )}
                        </Form.Item>
                    )}
                    <Button type="primary" htmlType="submit" block>
                        Далее
                    </Button>
                </Form>
            </Card>
        </Col>
    </Row>;
};

export default Form.create<any>()(Answer);
