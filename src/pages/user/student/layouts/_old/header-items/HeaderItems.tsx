import React from "react";
// import { BulbOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {Typography} from "antd";
import {HeaderItem} from "../../../../../../lib/ui";
import Coins from "../../../../../../lib/ui/coins/Coins";
import {useUser} from "../../../../../../hooks/use-user";

const {Text} = Typography;

const HeaderItems = () => {
    const {user} = useUser();

    return [
        <HeaderItem key="empty" mr="auto"/>,
        <HeaderItem key="money">
            <Text type="secondary">Монет:</Text>
            <Coins count={user.coins || 0}/>
        </HeaderItem>,
        // <HeaderItem key="news">
        //     <BulbOutlined /> Новости
        // </HeaderItem>,
        // <HeaderItem key="help">
        //     <InfoCircleOutlined /> Помощь
        // </HeaderItem>
    ]
};

export default HeaderItems;