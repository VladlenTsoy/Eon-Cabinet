import React, {useEffect} from 'react';
import {LoadingBlock, ButtonLink} from "lib/components";
import {Card} from "lib/components";
import {Typography, Empty} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import {useDispatch, useSelector} from "react-redux";
import {notificationSelector} from "../../../../../../../store/access/teacher/notification/notificationSlice";
import {fetchQuickNotice} from "../../../../../../../store/access/teacher/notification/quick-notice/fetchQuickNotice";

const {Title, Text} = Typography;

const CardStyled = styled(Card)`
  &.ant-card > .ant-card-body{
    display: flex;
    height: 100%;
    overflow: hidden;
  }
  
  img{
    margin: 0 1rem 0 0;
    width: 40%;
    transform: scale(2);
    position: relative;
    left: -20%;
  }
  
  .content{
    display: grid;
    grid-gap: 1rem 0;
    justify-content: space-between;
    
    h3.ant-typography{
      margin-bottom: 0
    }
  
    span.ant-typography{
      display: block;
      margin-bottom: 0;
    }
  }
  
  @media (max-width: 991.98px) {
       grid-column: 1 / 3;
  }
  
  @media (max-width: 576px) {
    grid-column: 1;
  }
`;

/**
 * Вывод уведомления (Обновления, Оплата, )
 *
 * @constructor
 */
const QuickNotice: React.FC = () => {
    const {quickNotice} = useSelector(notificationSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchQuickNotice())
        return () => {
            promise.abort()
        }
    }, [])

    return <CardStyled>
        {
            quickNotice.loading ?
                <LoadingBlock/> :
                quickNotice.data ?
                    <>
                        <img src={quickNotice.data.image} alt={quickNotice.data.title}/>
                        <div className="content">
                            <Title level={3}>{quickNotice.data.title}</Title>
                            <Text type="secondary">{quickNotice.data.text}</Text>
                            <ButtonLink
                                ghost
                                icon={<InfoCircleOutlined/>}
                                to={quickNotice.data.link.to}
                                type={quickNotice.data.link.type}
                            >
                                {quickNotice.data.link.text}
                            </ButtonLink>
                        </div>
                    </> :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
    </CardStyled>;
};

export default QuickNotice;