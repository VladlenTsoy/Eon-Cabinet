import React, {useEffect} from 'react';
import styled from "styled-components";
import {LoadingOutlined, UserOutlined} from '@ant-design/icons';
import {Card} from "lib/ui";
import {IconWrapper} from "../../../../../../../../lib/ui/card-statistic/CardStatistic";
import {useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../../../store/access/teacher/students/studentsSlice";
import {fetchStudentsStatistic} from "../../../../../../../../store/access/teacher/students/statistic/fetchStudentsStatistic";
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store";
import Counter from "./Counter/Counter";

const CardWrapper = styled(Card)`
   text-align: center;
   grid-column: 1 / 3;
   
   h2{
    font-size: 16px;
   }
`;

const BodyWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.75fr 0.75fr 1.25fr 1.25fr;
  
  .icon{
    margin: 0 auto;
  }
  
  .main-counter {
    font-size: 30px;
    font-weight: 500;
  }
`;

const Students: React.FC = () => {
    const {statistic} = useSelector(studentsSelector)
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchStudentsStatistic())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return <CardWrapper>
        <h2>Ученики</h2>
        <BodyWrapper>
            <IconWrapper className="icon" t="warning">
                <UserOutlined/>
            </IconWrapper>
            <div className="main-counter">{statistic.loading ? <LoadingOutlined/> : (statistic.students?.count)}</div>
            <Counter
                title="Активных"
                description="Активность учеников сравнительно с предыдущим месяцем."
                loading={statistic.loading}
                data={statistic?.students}
            />
            <Counter
                title="Дом. Задания"
                description="Выполненных домашних заданий сравнительно с отправленными."
                loading={statistic.loading}
                data={statistic?.homework}
            />
        </BodyWrapper>
    </CardWrapper>
};

export default Students;