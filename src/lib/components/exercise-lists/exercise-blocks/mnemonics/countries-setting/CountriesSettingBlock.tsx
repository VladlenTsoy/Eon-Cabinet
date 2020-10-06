import React from 'react';
import {useLanguage} from "../../../../../../hooks/use-language";

interface CountriesSettingBlockProps {
    setting: any;
}

const CountriesSettingBlock: React.FC<CountriesSettingBlockProps> = ({setting}) => {
    const {l} = useLanguage();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{l('mnemonicModeNames')[setting.mode]}</td>
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

export default CountriesSettingBlock;