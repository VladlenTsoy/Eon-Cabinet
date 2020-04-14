import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Typography, Form } from "antd";
import {Card} from "lib";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "../../../../../../../../store/game/actions";
import FormAnswer from "../FormAnswer";
import styled from "styled-components";

const {Title} = Typography;

const CardWrapper = styled(Card)`
  &.ant-card{
    text-align: center;
    
    .ant-card-body{
      .ant-typography{
        margin-bottom: 1rem;
      }  
      
      padding: 1.5rem;
    }
  }
`;

const Basic: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals, stats, currentTimes} = game;
    const dispatch = useDispatch();

    const handleSubmit = (values: any) => {
                if (setting.extra && setting.extra.includes('group')) {
                    let _totals = totals.map((total: any, key: number) => {
                        if (total.answer === Number(values.user[key]))
                            dispatch(gameChangeStats({...stats, success: stats.success + 1}));

                        return {
                            ...total, ...{
                                user: Number(values.user[key]),
                                result: total.answer === Number(values.user[key])
                            }
                        };
                    });

                    dispatch(gameChangeTotals(_totals));
                    dispatch(gameChangeStatus('result'));
                } else {
                    if (totals[currentTimes].answer === Number(values.user))
                        dispatch(gameChangeStats({...stats, success: stats.success + 1}));

                    totals[currentTimes] = {
                        ...totals[currentTimes], ...{
                            user: Number(values.user),
                            result: totals[currentTimes].answer === Number(values.user)
                        }
                    };

                    dispatch(gameChangeTotals(totals));
                    dispatch(gameChangeStatus('intermediate'));
                }
    };

    return (
        <Col xl={10} md={12} sm={14} xs={24}>
            <CardWrapper>
                <Form onFinish={handleSubmit}>
                    <Title level={2}>Введите ответ</Title>
                    <FormAnswer autofocus={true} name="user"/>
                    <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined />}>
                        Далее
                    </Button>
                </Form>
            </CardWrapper>
        </Col>
    );
};

export default Basic;