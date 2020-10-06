import React from 'react';
import {useLanguage} from "../../../../../../hooks/use-language";

interface DigitalPictureSettingBlockProps {
    setting: any;
}

// TODO - language
const DigitalPictureSettingBlock: React.FC<DigitalPictureSettingBlockProps> = ({setting}) => {
    const {l} = useLanguage();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{l('mnemonicModeNames')[setting.mode]}</td>
            <td className="text-mute">Кол-во:</td>
            <td>{setting.count}</td>
        </tr>
        <tr>
            <td className="text-mute">Время:</td>
            <td>{setting.time} с.</td>
            <td className="text-mute">Появление второй карты через:</td>
            <td>{setting.time_card} с.</td>
        </tr>
    </>;
};

export default DigitalPictureSettingBlock;