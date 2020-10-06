import React from 'react';
import {useLanguage} from "../../../../../../hooks/use-language";

interface PersonalitiesSettingBlockProps {
    setting: any;
}

const PersonalitiesSettingBlock:React.FC<PersonalitiesSettingBlockProps> = ({setting}) => {
    const {l} = useLanguage();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{l('mnemonicModeNames')[setting.mode]}</td>
            <td colSpan={2}/>
        </tr>
        <tr>
            <td className="text-mute">Кол-во:</td>
            <td>{setting.count}</td>
            <td className="text-mute">Время:</td>
            <td>{setting.time} мин.</td>
        </tr>
    </>;
};

export default PersonalitiesSettingBlock;