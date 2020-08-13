import React from 'react';
import NewsItem from "./news-item/NewsItem";
import HelpItem from "./help-item/HelpItem";
import {AccountItem} from "../../../../../lib/layouts/dashboard/header/laptop/account-menu/AccountMenu";

const AccountItems = [
    <AccountItem key="news">
        <NewsItem/>
    </AccountItem>,
    <AccountItem key="help">
        <HelpItem/>
    </AccountItem>
]

export default AccountItems;