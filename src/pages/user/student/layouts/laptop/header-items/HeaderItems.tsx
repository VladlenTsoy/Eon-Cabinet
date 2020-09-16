import React from "react"
import {HomeOutlined, HomeFilled, TeamOutlined, AppstoreOutlined, AppstoreFilled, TrophyOutlined, TrophyFilled, ThunderboltOutlined, ThunderboltFilled} from '@ant-design/icons';

export const HeaderItems = [
    {title: 'Главная', link: '/', icon: <HomeOutlined/>, iconActive: <HomeFilled/>},
    {title: 'Группа', link:'/group', icon: <TeamOutlined/>, iconActive: <TeamOutlined/>},
    {title: 'Домашние задания', link:'/homework', icon: <AppstoreOutlined/>, iconActive: <AppstoreFilled/>},
    {title: 'Олимпиада', link:'/olympiad', icon: <TrophyOutlined/>, iconActive: <TrophyFilled/>},
    {title: 'Турнир', link:'/tournament', icon: <ThunderboltOutlined/>, iconActive: <ThunderboltFilled/>}
]