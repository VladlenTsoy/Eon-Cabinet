import React from 'react';
import {useSelector} from "react-redux";

interface PersonalitiesSettingBlockProps {
    setting: any;
}

const PersonalitiesSettingBlock:React.FC<PersonalitiesSettingBlockProps> = ({setting}) => {
    const {language} = useSelector((state: any) => state);
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{language.common.mnemonicModeNames[setting.mode]}</td>
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