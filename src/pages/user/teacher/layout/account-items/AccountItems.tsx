import React from "react"
import HelpItem from "./help-item/HelpItem"
import {AccountItem} from "../../../../../lib/layouts/dashboard/header/laptop/account-menu/AccountMenu"
import PaymentItem from "./payment-item/PaymentItem"
import AboutItem from "./about-item/AboutItem"
import ProfileItem from "./profile-item/ProfileItem"

const AccountItems = [
    <AccountItem key="profile">
        <ProfileItem/>
    </AccountItem>,
    <AccountItem key="payment">
        <PaymentItem/>
    </AccountItem>,
    <AccountItem key="help">
        <HelpItem/>
    </AccountItem>,
    <AccountItem key="about">
        <AboutItem/>
    </AccountItem>
]

export default AccountItems