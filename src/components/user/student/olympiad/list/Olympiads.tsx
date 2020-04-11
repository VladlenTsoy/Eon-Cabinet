import React from 'react';
import CurrentOlympiads from "./current/CurrentOlympiads";
import Available from "./available/Available";

interface OlympiadProps {

}

const Olympiads:React.FC<OlympiadProps> = () => {
    return <>
        <div>
        </div>
        <CurrentOlympiads/>
        <Available/>
    </>;
};

export default Olympiads;