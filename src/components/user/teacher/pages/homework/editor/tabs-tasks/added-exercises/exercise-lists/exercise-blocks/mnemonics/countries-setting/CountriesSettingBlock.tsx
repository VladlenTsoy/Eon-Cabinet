import React from 'react';
import {useAppContext} from "store/context/use-app-context";

interface CountriesSettingBlockProps {
    setting: any;
}

const CountriesSettingBlock: React.FC<CountriesSettingBlockProps> = ({setting}) => {
    const {language} = useAppContext();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{language.common.mnemonicModeNames[setting.mode]}</td>
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