import React from "react"
import {BrowserRouter as Router, Switch} from "react-router-dom"
import FacebookLayout from "../../../lib/layouts/facebook/FacebookLayout"
import {HeaderItems} from "./layouts/laptop/header-items/HeaderItems"
import {SidebarItems} from "./layouts/laptop/sidebar-items/SidebarItems"
import {AccountItems} from "./layouts/laptop/account-items/AccountItems"

const Index = () => {
    return (
        <Router>
            <Switch>
                <FacebookLayout
                    navigations={HeaderItems}
                    sidebars={SidebarItems}
                    accountMenu={AccountItems}
                >

                </FacebookLayout>
            </Switch>
        </Router>
    )
}

export default Index
