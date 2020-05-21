import React from 'react';
import {LoadingBlock, ButtonLink} from "lib";
import {Card} from "lib";
import {Typography, Empty} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";

const {Title, Text} = Typography;

const CardWrapper = styled(Card)`
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
    const [loading, notice] = useApiUserGeneral({url: 'teacher/quick-notice', initValue: {}});

    return <CardWrapper>
        {
            loading ?
                <LoadingBlock/> :
                notice.hasOwnProperty('title') ?
                    <>
                        <img src={notice.image} alt={notice.title}/>
                        <div className="content">
                            <Title level={3}>{notice.title}</Title>
                            <Text type="secondary">{notice.text}</Text>
                            <ButtonLink
                                ghost
                                icon={<InfoCircleOutlined/>}
                                to={notice.link.to}
                                type={notice.link.type}
                            >
                                {notice.link.text}
                            </ButtonLink>
                        </div>

                    </> :
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
    </CardWrapper>;
};

export default QuickNotice;