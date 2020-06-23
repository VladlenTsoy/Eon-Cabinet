import React, {useEffect} from 'react';
import styled from "styled-components";
import {Tag, Typography} from "antd";
import {ButtonLink, GrayIcon, Spin} from "../../../../../../../../lib";
import OlympiadImage from "assets/images/olympiad/step_success_finally.svg";
import {ClockCircleOutlined, InfoCircleOutlined} from "@ant-design/icons";
import LeftToOlympiad
    from "../../../../../../../../_components/teacher/olympiads/card-olympiad/left-to-olympiad/LeftToOlympiad";
import {useDispatch, useSelector} from "react-redux";
import {olympiadSelector} from "../../../../../../../../store/reducers/teacher/olympiad/olympiadSlice";
import {fetchCurrentOlympiads} from "../../../../../../../../store/reducers/teacher/olympiad/fetchCurrentOlympiads";

const {Title} = Typography;

const OlympiadsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const OlympiadStyled = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  background: ${props => props.theme['@component-background']};
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  gap: 0 1rem;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  
  .image{
    display: flex;
    align-items: center;
    
    img{
      width: 100%;  
    }
  }
  
  .info{
    margin-bottom: 1rem;
    
    .title{
      color: ${props => props.theme.color_second};
    }
    
    .content{
      font-size: 20px;
    }
  }
  
  .actions{
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    
    .timer{
      background: ${props => props.theme['@layout-body-background']};
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      
      .anticon {
        margin-right: 0.5rem;
      }
      
      .space{
        margin: 0 0.1rem;
      }
    }
  }
`;

const Currents: React.FC = () => {
    const {current} = useSelector(olympiadSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchCurrentOlympiads());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    return <Spin spinning={current.loading} tip="Загрузка...">
        <OlympiadsStyled>
            {current.data.map((olympiad, key) =>
                <OlympiadStyled key={key}>
                    <div className="image">
                        <GrayIcon img={OlympiadImage} alt={olympiad.title} width="100%" percent={100}/>
                    </div>
                    <div className="content">
                        <Title level={3} className="title">
                            {olympiad.title}
                            {olympiad.access === 'public' ?
                                <Tag color="#5cb860">Открытый</Tag> :
                                olympiad.access === 'invite' ?
                                    <Tag color="#ff9800">Запрос</Tag> :
                                    <Tag color="#f55a4e">Закрытый</Tag>}
                        </Title>
                        <div className="info">
                            <div className="title">Этап</div>
                            <div className="title">Участвующих</div>
                            <div className="content">{olympiad.current_step.step + 1} из {olympiad.steps_count}</div>
                            <div className="content">{olympiad.students_count}</div>
                        </div>
                        <div className="actions">
                            <div className="timer">
                                <ClockCircleOutlined/>
                                <LeftToOlympiad end={olympiad.current_step.end_at}/>
                            </div>
                            <ButtonLink to={`/olympiad/${olympiad.id}`} type="dashed" shape="round" block
                                        icon={<InfoCircleOutlined/>} size="large">Подробнее</ButtonLink>
                        </div>
                    </div>
                </OlympiadStyled>
            )}
        </OlympiadsStyled>
    </Spin>;
};

export default Currents;