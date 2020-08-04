import React from 'react';
import Coins from "../../../../../../../../lib/components/coins/Coins";
import styled from "styled-components";
import moment from "moment";

const GroupCoinsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
 
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
    
    > span{
      margin-bottom: 0.25rem;
      font-weight: normal;
      font-size: 14px;
      color: ${props => props.theme.color_second};
    }
  }
  
  .coins{
    img{
      width: 30px;
    }
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

interface GroupCoinsProps {
    student: any;
}

const GroupCoins: React.FC<GroupCoinsProps> = ({student}) => {
    return <GroupCoinsWrapper>
        <div>
            <span>Активность</span>
            <div>{student.entrance_at ? moment(student.entrance_at).format('DD/MM/YY') : 'Пусто'}</div>
        </div>
        <div className="coins">
            <span>Монет</span>
            <Coins count={student.coins || 0}/>
        </div>
    </GroupCoinsWrapper>;
};

export default GroupCoins;