import React from 'react';
import {Col, Row, Form, Button, Typography} from "antd";
import styled from "styled-components";
import {Card} from "lib";
import {gameChangeStats, gameChangeStatus} from "../../../../../../store/reducers/common/game/actions";
import {useDispatch} from "react-redux";
import {totalsChange} from "../../../../../../store/reducers/common/tasks/totals/action";
import {ArrowRightOutlined} from '@ant-design/icons';

const {Title} = Typography;

const RowWrapper = styled(Row)`
  height: 100%;
`;

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

interface AnswerProps {
    cols: {},
    nextStatus?: string;
    checkHandler: (values: any) => any | {
        status: string;
        totals: any[] | {};
        stats: { all: number, success: number };
    };
}

const AnswerLayout: React.FC<AnswerProps> = (
    {
        children,
        cols,
        checkHandler
    }
) => {
    const dispatch = useDispatch();

    const submitHandler = (values: any) => {
        const {status, totals, stats} = checkHandler(values);

        dispatch(gameChangeStats(stats));
        dispatch(totalsChange(totals));
        dispatch(gameChangeStatus(status));
    };

    return <RowWrapper justify="center" align="middle" gutter={15}>
        <Col {...cols}>
            <CardWrapper>
                <Form onFinish={submitHandler} layout={"vertical"}>
                    <Title level={2}>Введите ответ</Title>
                    {children}
                    <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined/>}>
                        Далее
                    </Button>
                </Form>
            </CardWrapper>
        </Col>
    </RowWrapper>;
};

export default AnswerLayout;