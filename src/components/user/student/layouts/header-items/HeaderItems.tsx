import React from "react";
// import { BulbOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import {HeaderItem} from "../../../../../lib";
import Coins from "../../../../../lib/coins/Coins";

const {Text} = Typography;

const HeaderItems = [
    <HeaderItem key="empty" mr="auto"/>,
    <HeaderItem key="money">
        <Text type="secondary">Монет:</Text>
        <Coins count={0}/>
    </HeaderItem>,
    // <HeaderItem key="news">
    //     <BulbOutlined /> Новости
    // </HeaderItem>,
    // <HeaderItem key="help">
    //     <InfoCircleOutlined /> Помощь
    // </HeaderItem>
];

export default HeaderItems;