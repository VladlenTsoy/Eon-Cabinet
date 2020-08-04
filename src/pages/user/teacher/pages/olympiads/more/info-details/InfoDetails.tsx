import React from 'react';
import Info from "./info/Info";
import TitleInfo from "./title/Title";

interface InfoDetailsProps {
    olympiad: any;
    fetch: () => void;
}

const InfoDetails: React.FC<InfoDetailsProps> = ({olympiad, fetch}) => {
    return <>
        <TitleInfo olympiad={olympiad} fetch={fetch}/>
        <Info olympiad={olympiad}/>
    </>;
};

export default InfoDetails;