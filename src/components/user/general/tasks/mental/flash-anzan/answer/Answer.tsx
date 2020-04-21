import React from 'react';
import {Button, Col, Row, Typography, Form, InputNumber} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Card, FormItem} from "lib";
import {gameChangeStats, gameChangeStatus, gameChangeTotals} from "store/game/actions";
import {ArrowRightOutlined} from '@ant-design/icons';
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

const InputWrapper = styled(InputNumber)`
  width: 100%;
  
  .ant-input-number-input{
    text-align: center;
  }
`;

const Answer: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const {totals, stats} = game;

    const onFinishSubmit = (values: any) => {
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
    };

    return <Row justify="center" align="middle" gutter={15}>
        <Col xl={8}>
            <CardWrapper>
                <Form onFinish={onFinishSubmit}>
                    <Title level={2}>Введите ответ</Title>
                    {totals.map((total: any, key: any) =>
                        <FormItem
                            key={key}
                            name={['user', key]}
                            requiredMsg={`Введите ответ №${key + 1}!`}
                        >
                            <InputWrapper
                                type="number"
                                autoFocus={key === 0}
                                autoComplete="off"
                                size="large"
                                placeholder={`Ваш ответ №${key + 1}`}
                            />
                        </FormItem>
                    )}
                    <Button type="primary" htmlType="submit" size="large" block icon={<ArrowRightOutlined/>}>
                        Далее
                    </Button>
                </Form>
            </CardWrapper>
        </Col>
    </Row>;
};

export default Answer;
