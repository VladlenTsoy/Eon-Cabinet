import React from 'react';
import {Navigation, NavigationButton} from "lib";
import {Link} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import Discipline from "./disipline/Discipline";

const Olympiads = () => {
    return <>
        <Navigation>
            <Link to="/olympiad/create">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать олимпиаду
                </NavigationButton>
            </Link>
        </Navigation>
        <Discipline/>
    </>;
};

export default Olympiads;