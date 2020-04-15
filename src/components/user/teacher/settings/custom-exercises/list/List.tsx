import React from 'react';
import {Navigation, NavigationButton} from "layouts/components";
import {Link} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";

const List:React.FC = () => {
    return <>
        <Navigation>
            <Link to={`/settings/custom-exercises/create`}>
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Добавить
                </NavigationButton>
            </Link>
        </Navigation>
    </>;
};

export default List;