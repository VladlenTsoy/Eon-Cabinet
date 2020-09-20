import React from 'react';
import {useLanguage} from "../../../../../../hooks/use-language";

interface CountriesSettingBlockProps {
    setting: any;
}

// TODO - language
const CountriesSettingBlock: React.FC<CountriesSettingBlockProps> = ({setting}) => {
    // const {language} = useLanguage();
    return <>
        <tr>
            <td className="text-mute">Мод:</td>
            {/*<td>{language.common.mnemonicModeNames[setting.mode]}</td>*/}
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