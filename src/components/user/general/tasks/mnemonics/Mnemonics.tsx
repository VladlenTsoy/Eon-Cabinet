import React from 'react';
import DigitalRow from "./digital-row/DigitalRow";
import WordList from "./word-list/WordList";
import Numbers from "./numbers/Numbers";
import Personalities from "./personalities/Personalities";
import DigitalImage from "./digital-image/DigitalImage";
import MasterSystem from "./master-system/MasterSystem";
import Countries from "./countries/Countries";
import DigitalPicture from "./digital-picture/DigitalPicture";

interface MnemonicsProps {
    taskId: string;
}

const Mnemonics: React.FC<MnemonicsProps> = ({taskId}) => {
    const selectTaskById = (id: number) => {
        switch (id) {
            case 10:
                return <DigitalRow/>;
            case 15:
                return <WordList/>;
            case 16:
                return <Numbers/>;
            case 8:
                return <Personalities/>;
            case 13:
                return <DigitalImage/>;
            case 11:
                return <MasterSystem/>;
            case 9:
                return <Countries/>;
            case 19:
                return <DigitalPicture/>;
        }
    };
    return <>
        {selectTaskById(Number(taskId))}
    </>;
};

export default Mnemonics;