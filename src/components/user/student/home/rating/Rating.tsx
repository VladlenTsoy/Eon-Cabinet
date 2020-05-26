import React from 'react';
import {List} from "antd";
import {Card} from "lib";
import {UserImage, Legend} from "layouts/components";
import {useAppContext} from "store/context/use-app-context";
import styled from "styled-components";

interface RatingProps {

}

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  
  .numbering{
    font-weight: 900;
    margin-right: 0.5rem;
    font-size: 18px;
    color: ${props => props.theme.color_warning};
  }
  
  .user-info{
    margin: 0 auto 0 0.5rem;
  
    .user-name{
      display: block;
    }
    
    .level{
      display: block;
      font-size: 12px;
      color: ${props => props.theme.color_second};
      
      span{
        color: ${props => props.theme.color_primary};
      }
    }
  }
  
  .user-rating{
    font-weight: 900;
    font-size: 20px;
  }
`;

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const Rating: React.FC<RatingProps> = () => {
    const {user} = useAppContext();
    return <>
        <Legend>Рейтинг</Legend>
        <Card className="animated fadeIn">
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item: any, key: number) => (
                    <List.Item>
                        <ItemWrapper>
                            <span className="numbering">#{key + 1}</span>
                            <UserImage src={user.image} alt={user.first_name}/>
                            <div className="user-info">
                                <span className="user-name">{user.first_name} {user.last_name}</span>
                                <span className="level">Уровень: <span>{user.data.level}</span></span>
                            </div>
                            <div className="user-rating">
                                265
                            </div>
                        </ItemWrapper>
                    </List.Item>
                )}
            />
        </Card>
        </>;
};

export default Rating;