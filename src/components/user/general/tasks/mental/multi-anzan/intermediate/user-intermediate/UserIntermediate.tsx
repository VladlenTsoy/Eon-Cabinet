import React from 'react';
import {TrophyOutlined} from '@ant-design/icons';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {game} from "../../../../../../../../store/reducers/common/game/reducer";
import {settingAnzan} from "../../../../../../../../store/reducers/common/tasks/setting/reducer";

const WaitWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5vw;
  font-weight: 600;
  color: ${props => props.theme.color_minimal};
`;

const UserIntermediateWrapper: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  .anticon{
    font-size: 110px;
    margin-bottom: 0.5rem;
    color: ${(props: any) => props.result === 'true' ? props.theme.color_warning : props.theme.color_minimal};
  }
  
  .counts-block{
    display: flex;
    text-align: center;
    
    .passed-block{
      margin-right: 1rem;
    }
    
    .title{
      display: block;
      color: ${(props: any) => props.theme.color_minimal};
    }
    
    .desc{
      display: block;
      font-size: 40px;
    }
  }
`;

interface UserIntermediateProps {
    keyTask: number;
    isWait: boolean;
    result: boolean;
}

const UserIntermediate: React.FC<UserIntermediateProps> = (
    {
        keyTask,
        isWait,
        result,
    }
) => {
    const {currentTimes} = useSelector(game);
    const setting = useSelector(settingAnzan);
    return isWait ?
        <WaitWrapper>
            Ожидание...
        </WaitWrapper> :
        <UserIntermediateWrapper result={result.toString()}>
            <TrophyOutlined/>
            <div className="counts-block">
                <div className="passed-block">
                    <span className="title">Пройдено</span>
                    <span className="desc">{currentTimes + 1}</span>
                </div>
                <div className="left-block">
                    <span className="title">Всего</span>
                    <span className="desc">{setting.windows[keyTask].times}</span>
                </div>
            </div>
        </UserIntermediateWrapper>;
};

export default UserIntermediate;