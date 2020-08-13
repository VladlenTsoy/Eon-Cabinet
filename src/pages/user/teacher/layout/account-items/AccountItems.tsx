import React from 'react';
import NewsItem from "../header-items/news-item/NewsItem";
import HelpItem from "../header-items/help-item/HelpItem";
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