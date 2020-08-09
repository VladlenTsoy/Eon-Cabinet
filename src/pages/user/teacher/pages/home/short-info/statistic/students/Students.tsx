import React, {useEffect} from 'react';
import styled from "styled-components";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    LoadingOutlined,
    QuestionCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Popover} from "antd";
import {Card} from "lib/components";
import {IconWrapper} from "../../../../../../../../lib/components/card-statistic/CardStatistic";
import {useDispatch, useSelector} from "react-redux";
import {studentsSelector} from "../../../../../../../../store/access/teacher/students/studentsSlice";
import {fetchStudentsStatistic} from "../../../../../../../../store/access/teacher/students/statistic/fetchStudentsStatistic";

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
  
  .counter-block {
    display: flex;
    flex-direction: column;
    
    > div:first-child {
      color: ${props => props.theme['@text-color-secondary']};
      font-size: 12px;
      
      .anticon{
        margin-left: 0.25rem;
        cursor: pointer;
      }
    }
    
    > div:last-child {
      position: relative;
      font-size: 22px;
      font-weight: 300;
      
      span.anticon-arrow-up {
        color: ${props => props.theme.color_success};
        font-size: 20px;
        position: relative;
        top: -6px;
      }
      
      span.anticon-arrow-down {
        color: ${props => props.theme.color_danger};
        font-size: 20px;
      }
    }
  }
`;

const Students: React.FC = () => {
    const {statistic} = useSelector(studentsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStudentsStatistic({}))
    }, [dispatch])

    return <CardWrapper>
        <h2>Ученики</h2>
        <BodyWrapper>
            <IconWrapper className="icon" t="warning">
                <UserOutlined/>
            </IconWrapper>
            <div className="main-counter">{statistic.loading ? <LoadingOutlined/> : (statistic.students?.count)}</div>
            <div className="counter-block">
                <div>
                    Активных
                    <Popover content={<>Активность учеников сравнительно с предыдущим месяцем.</>}>
                        <QuestionCircleOutlined/>
                    </Popover>
                </div>
                <div>
                    {statistic.loading ?
                        <LoadingOutlined/> :
                        <>
                            {statistic?.students.increase ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                            {(statistic?.students.percent).toFixed(1)}%
                        </>
                    }

                </div>
            </div>
            <div className="counter-block">
                <div>
                    Дом. Задания
                    <Popover content={<>Выполненных домашних заданий сравнительно с отправленными.</>}>
                        <QuestionCircleOutlined/>
                    </Popover>
                </div>
                <div>
                    {statistic.loading ?
                        <LoadingOutlined/> :
                        <>
                            {statistic?.homework.increase ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                            {(statistic?.homework.percent).toFixed(1)}%
                        </>
                    }
                </div>
            </div>
        </BodyWrapper>
    </CardWrapper>
};

export default Students;