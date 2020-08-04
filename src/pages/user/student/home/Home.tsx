import React from 'react';
import Olympiad from "./olympiad/Olympiad";
import Homework from "./homework/Homework";
import Statistic from "./statistic/Statistic";

const Home: React.FC = () => {
    return <>
        <Statistic/>
        <Homework/>
        <Olympiad/>
    </>
};

export default Home;