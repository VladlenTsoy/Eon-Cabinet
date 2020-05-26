import React from 'react';
import {Card} from "lib";
import {ButtonLink} from "lib";
import {useAppContext} from "store/context/use-app-context";
import {AppstoreOutlined, TeamOutlined, FlagOutlined} from '@ant-design/icons';
import styled from "styled-components";
import ImageTimer from "../../../../teacher/pages/olympiads/list/current/card/image-timer/ImageTimer";

const CardWrapper = styled(Card)`
  &.ant-card{
    .ant-card-body{
      height: 100%;
    }
  }
`;

const OlympiadWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .ant-typography {
    margin-bottom: 1rem;
  }

  .counters{
    margin-bottom: 1rem;
    
    .counter{
      display: flex;
      align-items: center; 
      margin-bottom: 0.5rem; 
    
      i{
        font-size: 22px;
        color: ${props => props.theme.color_warning};
        border-radius: 50%;
        padding: 5px;
        margin-right: 0.5rem;
      }
    
      span{
      
      }
    }
  }
`;

interface CardOlympiadProps {
    olympiad: any;
    fetch: () => void;
}

const CardOlympiad: React.FC<CardOlympiadProps> = ({olympiad, fetch}) => {
    const {language} = useAppContext();
    return (
        <CardWrapper className="animated fadeIn">
            <OlympiadWrapper>
                <ImageTimer callback={fetch} endAt={olympiad.current_step.end_at}/>
                <ContentWrapper>
                    <Card.Title title={olympiad.title} level={3}/>
                    <div className="counters">
                        <div className="counter">
                            <AppstoreOutlined/>
                            <span>{olympiad.steps_count} - этапов</span>
                        </div>
                        <div className="counter">
                            <TeamOutlined/>
                            <span>{olympiad.students_count} - участвующих</span>
                        </div>
                    </div>
                    <ButtonLink icon={<FlagOutlined/>} to={`olympiads/${olympiad.id}`} block>
                        {language.common.more}
                    </ButtonLink>
                </ContentWrapper>
            </OlympiadWrapper>
        </CardWrapper>
    );
};

export default CardOlympiad;