import React from "react"
import {AccountItem} from "../../../../../../lib/layouts/dashboard/header/laptop/account-menu/AccountMenu"
import NewsItem from "../../../../teacher/layout/account-items/news-item/NewsItem"
import HelpItem from "../../../../teacher/layout/account-items/help-item/HelpItem"

export const AccountItems = [
    <AccountItem key="news">
        <NewsItem/>
    </AccountItem>,
    <AccountItem key="help">
        <HelpItem/>
    </AccountItem>
]