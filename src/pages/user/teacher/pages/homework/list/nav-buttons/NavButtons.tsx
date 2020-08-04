import React from 'react';
import {Link} from "react-router-dom";
import {NavigationButton, Navigation} from "lib/components";
import {PlusOutlined, AppstoreOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../../../store/access/teacher/discipline/disciplineSlice";

const NavButtons = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);

    return <Navigation>
        <Link to="/homework/create">
            <NavigationButton type="primary" icon={<PlusOutlined/>}>
                Создать домашнее задание
            </NavigationButton>
        </Link>
        {
            activeDisciplineId === 1 &&
            <Link to="/settings/custom-exercises">
                <NavigationButton type="primary" icon={<AppstoreOutlined/>}>
                    Свои примеры
                </NavigationButton>
            </Link>
        }
    </Navigation>;
};

export default React.memo(NavButtons);