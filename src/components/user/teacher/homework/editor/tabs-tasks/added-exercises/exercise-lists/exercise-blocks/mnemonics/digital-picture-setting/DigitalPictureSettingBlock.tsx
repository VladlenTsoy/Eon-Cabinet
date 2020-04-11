import React from 'react';
import {useSelector} from "react-redux";

interface DigitalPictureSettingBlockProps {
    setting: any;
}

const DigitalPictureSettingBlock:React.FC<DigitalPictureSettingBlockProps> = ({setting}) => {
    const {language} = useSelector((state: any) => state);
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{language.common.mnemonicModeNames[setting.mode]}</td>
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