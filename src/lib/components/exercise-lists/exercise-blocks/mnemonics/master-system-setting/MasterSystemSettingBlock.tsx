import React from 'react';
import {useLanguage} from "../../../../../../hooks/use-language";

interface MasterSystemSettingBlockProps {
    setting: any;
}

// TODO - language
const MasterSystemSettingBlock: React.FC<MasterSystemSettingBlockProps> = ({setting}) => {
    // const {language} = useLanguage();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            {/*<td>{language.common.mnemonic3ModeNames[setting.mode]}</td>*/}
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