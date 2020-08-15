import React, {useEffect} from 'react';
import {HistoryOutlined} from '@ant-design/icons';
import {Button, Col, Empty, Tabs} from "antd";
import {Legend, Spin} from "../../../../../../../lib/components";
import {Card} from "lib/components";
import Tab from "./tab/Tab";
import Collapse from "./collapse/Collapse";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store";
import {changeHomeworkPage, studentSelector} from "store/access/teacher/student/studentSlice";
import {useSelector} from "react-redux";
import {fetchStudentHomeworkPaginate} from "../../../../../../../store/access/teacher/student/homework/fetchStudentHomeworkPaginate";

const {TabPane} = Tabs;

const TabsWrapper = styled(Tabs)`
  &.ant-tabs{ 
    .ant-tabs-nav .ant-tabs-tab{
      margin-right: 0.5rem;
    }
  
    .ant-tabs-left-bar{
      div.ant-tabs-tab{
        padding-left: 0;
        margin-right: 0;
        margin-bottom: 0.5rem;
      }
      
      .ant-tabs-extra-content{
        padding-right: 1rem;
      }
    }
  }
  
  @media (max-width: 576px) {
    .ant-collapse > .ant-collapse-item > .ant-collapse-header {
      padding-left: 10px;
      
      .ant-collapse-arrow{
        left: 4px;
      }
    }
  }
  
  .ant-collapse-content > .ant-collapse-content-box{
    padding: 0;
  }
`;

interface HomeworkProps {
    id: string;
}

const Homework: React.FC<HomeworkProps> = ({id}) => {
    const {homework} = useSelector(studentSelector)
    const dispatch = useTeacherDispatch()
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    const moreHandler = () => dispatch(changeHomeworkPage(homework.page + 1));

    useEffect(() => {
        const promise = dispatch(fetchStudentHomeworkPaginate({studentId: Number(id), page: homework.page}))
        return () => {
            promise.abort()
        }

    }, [homework.page, dispatch])

    return <Col span={24}>
        <Legend style={{marginTop: 0}}>Домашние задания</Legend>
        <Card>
            <Spin spinning={homework.loading} tip="Загрузка...">
                {
                    homework.data.length ?
                        <TabsWrapper
                            tabPosition={isBreakpoint ? 'top' : 'left'}
                            tabBarExtraContent={
                                homework.isMore ? <Button icon={<HistoryOutlined/>} block
                                                          onClick={moreHandler}>Еще</Button> : null
                            }
                        >
                            {
                                homework.data.map((_homework, key) =>
                                    <TabPane tab={<Tab homework={_homework}/>} key={key}>
                                        <Collapse homework={_homework}/>
                                    </TabPane>
                                )
                            }
                        </TabsWrapper> :
                        <Empty/>
                }
            </Spin>
        </Card>
    </Col>
};

export default Homework;