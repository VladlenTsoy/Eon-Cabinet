import React from 'react';

interface FlashAnzanSettingProps {
    setting: any;
}

const FlashAnzanSettingBlock: React.FC<FlashAnzanSettingProps> = ({setting}) => {
    return <>
        <tr>
            <td className="text-mute">C:</td>
            <td>{setting.from}</td>
            <td className="text-mute">До:</td>
            <td>{setting.to}</td>
        </tr>
        <tr>
            <td className="text-mute">Кол-во:</td>
            <td>{setting.count}</td>
            <td className="text-mute">Время:</td>
            <td>{setting.time}</td>
        </tr>
    </>;
};

export default FlashAnzanSettingBlock;