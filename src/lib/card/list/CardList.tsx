import * as React from "react";
import styled from "styled-components";
import {Typography} from "antd";

const {Text} = Typography;

const CardListWrapper = styled.div`
    margin-bottom: 1rem;

    p {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
`;

interface CardListProps {
    list: any[];
}

const CardList: React.FC<CardListProps> = ({list}) =>
    <CardListWrapper>
        {list.map((data: any, key: number) =>
            <p key={key}>
                <Text type="secondary">{data.title}:</Text> {data.item}
            </p>
        )}
    </CardListWrapper>;

export default CardList;