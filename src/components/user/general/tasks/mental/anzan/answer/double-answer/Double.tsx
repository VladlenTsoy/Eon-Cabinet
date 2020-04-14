import React from 'react';
import {Card} from "lib";
import {Button, Col, Row, Typography, Form} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../../store/game/actions";
import FormAnswer from "../FormAnswer";

const {Title} = Typography;

const Double: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals, stats, currentTimes} = game;
    const dispatch = useDispatch();

    const handleSubmitDouble = (values: any) => {
        if (setting.extra && setting.extra.includes('group')) {
            let _totals = totals.map((total: any, key: number) => {
                if (total[0].answer === Number(values.user1[key]))
                    stats.success += 1;

                if (total[1].answer === Number(values.user2[key]))
                    stats.success += 1;

                return [
                    {
                        ...total[0],
                        ...{
                            user: Number(values.user1[key]),
                            result: total[0].answer === Number(values.user1[key])
                        }
                    },
                    {
                        ...total[1],
                        ...{
                            user: Number(values.user2[key]),
                            result: total[1].answer === Number(values.user2[key])
                        }
                    }
                ];
            });

            dispatch(gameChangeStats(stats));
            dispatch(gameChangeTotals(_totals));
            dispatch(gameChangeStatus('result'));
        } else {
            if (totals[currentTimes][0].answer === Number(values.user1))
                stats.success += 1;

            if (totals[currentTimes][1].answer === Number(values.user2))
                stats.success += 1;

            totals[currentTimes] = [
                {
                    ...totals[currentTimes][0], ...{
                        user: Number(values.user1),
                        result: totals[currentTimes][0].answer === Number(values.user1)
                    }
                },
                {
                    ...totals[currentTimes][1], ...{
                        user: Number(values.user2),
                        result: totals[currentTimes][1].answer === Number(values.user2)
                    }
                },
            ];

            dispatch(gameChangeStats(stats));
            dispatch(gameChangeTotals(totals));
            dispatch(gameChangeStatus('intermediate'));
        }
    };

    return <Col xl={12} md={14} sm={16} xs={24}>
        <Card>
            <Form onFinish={handleSubmitDouble}>
                <Title level={3}>Введите ответ</Title>
                <Row justify="center" align="middle" gutter={15}>
                    <Col xl={12}>
                        <FormAnswer autofocus={true} name="user1"/>
                    </Col>
                    <Col xl={12}>
                        <FormAnswer autofocus={false} name="user2"/>
                    </Col>
                </Row>
                <Button type="primary" htmlType="submit" block>
                    Далее
                </Button>
            </Form>
        </Card>
    </Col>;
};

export default Double;