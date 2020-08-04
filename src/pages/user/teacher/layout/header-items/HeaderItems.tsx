import React from "react";
import Search from "./search-item/Search";
import DisciplinesItem from "./disciplines-item/DisciplinesItem";
import {HeaderItem} from "../../../../../lib/components";
import HelpItem from "./help-item/HelpItem";
import NewsItem from "./news-item/NewsItem";

const HeaderItems = [
    <Search key="search"/>,
    <DisciplinesItem key="disciplines"/>,
    <HeaderItem key="news">
        <NewsItem/>
    </HeaderItem>,
    <HeaderItem key="help">
        <HelpItem/>
    </HeaderItem>
];

export default HeaderItems;