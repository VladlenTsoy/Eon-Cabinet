import React from 'react';

interface DigitalRowSettingBlockProps {
    setting: any;
}

const DigitalRowSettingBlock:React.FC<DigitalRowSettingBlockProps> = ({setting}) => {
    return <tr>
        <td className="text-mute">Кол-во:</td>
        <td>{setting.count}</td>
        <td className="text-mute">Время:</td>
        <td>{setting.time} мин.</td>
    </tr>;
};

export default DigitalRowSettingBlock;