import React from "react"
import {HomeOutlined, HomeFilled, TeamOutlined, AppstoreOutlined, AppstoreFilled, TrophyOutlined, TrophyFilled, ThunderboltOutlined, ThunderboltFilled} from '@ant-design/icons';


export const Navigations = [
    {title: 'Главная', link: '/', icon: <HomeOutlined/>, iconActive: <HomeFilled/>},
    {title: 'Группы', link:'/groups', icon: <TeamOutlined/>, iconActive: <TeamOutlined/>},
    {title: 'Домашние задания', link:'/homework', icon: <AppstoreOutlined/>, iconActive: <AppstoreFilled/>},
    {title: 'Тренировка', link:'/training', icon: <ThunderboltOutlined/>, iconActive: <ThunderboltFilled/>},
    {title: 'Олимпиада', link:'/olympiad', icon: <TrophyOutlined/>, iconActive: <TrophyFilled/>}
]