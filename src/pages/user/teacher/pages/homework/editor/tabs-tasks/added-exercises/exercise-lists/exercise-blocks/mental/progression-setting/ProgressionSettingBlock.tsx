import React from 'react';

interface ProgressionSettingBlockProps {
    setting: any;
}

const ProgressionSettingBlock: React.FC<ProgressionSettingBlockProps> = ({setting}) => {
    return <tr>
        <td className="text-mute">Кол-во:</td>
        <td>{setting.count}-значные</td>
        <td className="text-mute">Время:</td>
        <td>{setting.time}</td>
    </tr>;
};

export default ProgressionSettingBlock;