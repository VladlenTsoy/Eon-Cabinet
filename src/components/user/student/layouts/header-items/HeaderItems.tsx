import React from "react";
import { BulbOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import {HeaderItem} from "../../../../../layouts/components";
import Coins from "../../../../../layouts/components/Coins";

const {Text} = Typography;

const HeaderItems = [
    <HeaderItem key="empty" mr="auto"/>,
    <HeaderItem key="money">
        <Text type="secondary">Монет:</Text>
        <Coins count={50}/>
    </HeaderItem>,
    <HeaderItem key="news">
        <BulbOutlined /> Новости
    </HeaderItem>,
    <HeaderItem key="help">
        <InfoCircleOutlined /> Помощь
    </HeaderItem>
];

export default HeaderItems;