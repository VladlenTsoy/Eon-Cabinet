import React, {useRef, useState} from 'react';
import {RedoOutlined} from '@ant-design/icons';
import {DatePicker, Button, Radio, Typography, Form} from "antd";
import {Alert} from "../../../../../../../layouts/components";
import styled from "styled-components";
import moment from "moment";

const {RangePicker} = DatePicker;
const {Title} = Typography;

const DayOfWeekWrapper = styled.div`
  text-align: center;
  
  .ant-alert{
    text-align: left;
    margin: 1rem 0 0;
  }
  
  .ant-calendar-picker{
    margin-bottom: 1rem;  
  }
  
  .ant-btn{
     margin-bottom: 1rem;
  }
`;

const DayOfWeek = () => {
    const weekRef = useRef<any>();
    const [visible, setVisible] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [answer, setAnswer] = useState<any>(null);

    const onFinishHandler = (values: any) => {
        setVisible(false);
        const [start, end] = values.period;
        if (start && end) {
            const date = new Date(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()));
            setAnswer(date);
        }
        if (weekRef && weekRef.current)
            weekRef.current.state.value = undefined;
    };

    const changeWeekHandler = (e: any) => {
        setUser(e.target.value);
        setVisible(true);
    };

    return (
        <DayOfWeekWrapper>
            <Form onFinish={onFinishHandler}>
                <Form.Item name="period">
                    <RangePicker size="large" bordered={false} style={{width: '100%', textAlign: 'center'}}/>
                </Form.Item>
                <Button type="primary" htmlType="submit" icon={<RedoOutlined/>} block size="large">
                    Обновить дату
                </Button>
            </Form>
            {answer ?
                <>
                    <Title level={1}>Дата: {moment(answer).format('DD.MM.YYYY')}</Title>
                    <Radio.Group buttonStyle="solid" onChange={changeWeekHandler} ref={weekRef} size="large">
                        <Radio.Button value="1">Пн</Radio.Button>
                        <Radio.Button value="2">Вт</Radio.Button>
                        <Radio.Button value="3">Ср</Radio.Button>
                        <Radio.Button value="4">Чт</Radio.Button>
                        <Radio.Button value="5">Пт</Radio.Button>
                        <Radio.Button value="6">Сб</Radio.Button>
                        <Radio.Button value="0">Вс</Radio.Button>
                    </Radio.Group>
                </> : null
            }
            {visible && user && answer ?
                Number(user) === Number(answer.getDay()) ?
                    <Alert message="Успех!" description="Вы успешно выбрали день недели." type="success" showIcon/> :
                    <Alert message="Ошибка!" description="Выбранный вами день недели не верный." type="error" showIcon/>
                : null
            }
        </DayOfWeekWrapper>
    );
};

export default DayOfWeek;