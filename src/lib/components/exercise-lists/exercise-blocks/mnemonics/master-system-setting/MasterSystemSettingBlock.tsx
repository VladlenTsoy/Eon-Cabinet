import React from 'react';
import {useLanguage} from "../../../../../../hooks/use-language";

interface MasterSystemSettingBlockProps {
    setting: any;
}

const MasterSystemSettingBlock: React.FC<MasterSystemSettingBlockProps> = ({setting}) => {
    const {l} = useLanguage();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{l('mnemonic3ModeNames')[setting.mode]}</td>
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