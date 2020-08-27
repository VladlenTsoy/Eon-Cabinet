import React from 'react';

interface SpecialSettingBlockProps {
    setting: any;
}

const SpecialSettingBlock: React.FC<SpecialSettingBlockProps> = ({setting}) => {
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{setting.mode}</td>
            <td className="text-mute">Кол-во раз:</td>
            <td>{setting.times}</td>
        </tr>
        <tr>
            <td className="text-mute">C:</td>
            <td>{setting.from}</td>
            <td className="text-mute">До:</td>
            <td>{setting.to}</td>
        </tr>
        <tr>
            <td className="text-mute">Кол-во:</td>
            <td>{setting.count}-значные</td>
            <td className="text-mute">Время:</td>
            <td>{setting.time}</td>
        </tr>
        </>;
};

export default SpecialSettingBlock;