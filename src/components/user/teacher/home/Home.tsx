import React from 'react';
import LastExecuted from "./last-executed/LastExecuted";
import Olympiad from "./olympiad/Olympiad";
import ShortInfo from "./short-info/ShortInfo";
import Notification from "./notification/Notification";

/**
 * Главная страница учителя
 *
 * @constructor
 */
const Home: React.FC = () => {
    return <>
        <Notification/>
        <ShortInfo/>
        <LastExecuted/>
        <Olympiad/>
    </>;
};

export default Home;