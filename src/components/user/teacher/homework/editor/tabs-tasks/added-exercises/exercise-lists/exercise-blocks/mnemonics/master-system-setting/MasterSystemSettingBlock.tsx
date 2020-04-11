import React from 'react';
import {useSelector} from "react-redux";

interface MasterSystemSettingBlockProps {
setting: any;
}

const MasterSystemSettingBlock:React.FC<MasterSystemSettingBlockProps> = ({setting}) => {
    const {language} = useSelector((state: any) => state);
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{language.common.mnemonic3ModeNames[setting.mode]}</td>
            <td colSpan={2}/>
        </tr>
        <tr>
            <td className="text-mute">Кол-во:</td>
            <td>{setting.count}</td>
            <td className="text-mute">Время:</td>
            <td>{setting.time} с.</td>
        </tr>
    </>;
};

export default MasterSystemSettingBlock;