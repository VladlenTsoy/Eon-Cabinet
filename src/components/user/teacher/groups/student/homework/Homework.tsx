import React, {useState} from 'react';
import { HistoryOutlined } from '@ant-design/icons';
import {Button, Col, Empty, Tabs} from "antd";
import {Legend, Spin} from "../../../../../../layouts/components";
import {Card} from "lib";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import Tab from "./tab/Tab";
import Collapse from "./collapse/Collapse";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../../effects/use-screen-window.effect";

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
    const [page, setPage] = useState(1);
    const [isMore, setIsMore] = useState(false);
    const [homework, setHomework] = useState<any[]>([]);

    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    const [loading, , , fetch] = useApiUserGeneral(
        {
            url: `/teacher/homework/student/${id}/paginate`,
            afterRequest: (data) => {
                setPage(data.current_page);
                setIsMore(data.last_page > data.current_page);
                setHomework(prevState => [...prevState, ...data.data]);
            }
        }
    );

    const moreHandler = () => {
        fetch({page: page + 1});
    };

    return (
        <Col span={24}>
            <Legend style={{marginTop: 0}}>Домашние задания</Legend>
            <Card>
                <Spin spinning={loading} tip="Загрузка...">
                    {
                        homework.length ?
                            <TabsWrapper
                                tabPosition={isBreakpoint ? 'top' : 'left'}
                                tabBarExtraContent={
                                    isMore ? <Button icon={<HistoryOutlined />} block onClick={moreHandler}>Еще</Button> : null
                                }
                            >
                                {
                                    homework.map((_homework: any, key: any) =>
                                        <TabPane
                                            tab={<Tab homework={_homework}/>}
                                            key={key}
                                        >
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
    );
};

export default Homework;