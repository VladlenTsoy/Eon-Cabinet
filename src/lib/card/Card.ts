import {Card as AntdCard} from "antd";
import {CardProps} from "antd/lib/card";
import styled from "styled-components";
import CardHeader from "./header/CardHeader";
import CardTitle from "./title/CardTitle";
import CardList from "./list/CardList";
import CardImage from "./image/CardImage";

const Card: any = styled(AntdCard)<CardProps>`
  &.ant-card{
    border-radius: 10px;
    border: 0;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 1.5rem;

    .ant-card-body {
      padding: 1rem;
    }
  }
`;

Card.Title = CardTitle;
Card.Header = CardHeader;
Card.List = CardList;
Card.Image = CardImage;

export default Card;