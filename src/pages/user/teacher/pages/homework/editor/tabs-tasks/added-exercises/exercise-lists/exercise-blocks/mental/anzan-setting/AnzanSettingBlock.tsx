import React, {useState} from 'react';
import AnzanType from "./anzan-type/AnzanType";
import {useLanguage} from "../../../../../../../../../../../../hooks/use-language";

interface AnzanSettingBlockProps {
    setting: any;
}

const AnzanSettingBlock: React.FC<AnzanSettingBlockProps> = ({setting}) => {
    const {language} = useLanguage();
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    return <>
        <AnzanType setting={setting}/>
        {isMultiplication ?
            <tr>
                <td>Режим:</td>
                <td>
                    {language.common.lengthNames[setting.length]}&nbsp;
                    {language.common.modeNames[setting.mode]}&nbsp;
                    {setting.type === 'o' ? setting.theme : language.common.typeNames[1][setting.type]}
                </td>
                {setting.anzan === 'list' ?
                    <>
                        <td>Таблиц:</td>
                        <td>{setting.tables}</td>
                    </> :
                    <td colSpan={2}/>
                }
            </tr> : [
                <tr key="mode">
                    <td>Мод:</td>
                    <td><b>{language.common.modeNames[setting.mode]}</b></td>
                    <td>Разряд чисел:</td>
                    <td>{`${setting.length}-значные`}</td>
                </tr>,
                <tr key="type">
                    <td>Режим:</td>
                    <td>{language.common.typeNames[0][setting.type]}</td>
                    {setting.anzan === 'list' ?
                        <>
                            <td>Таблиц:</td>
                            <td>{setting.tables}</td>
                        </> :
                        <>
                            <td>Кол-во:</td>
                            <td>{setting.count}</td>
                        </>
                    }
                </tr>
            ]}
        {setting.anzan === 'list' ?
            <tr>
                <td>Столбцов:</td>
                <td>{setting.column}</td>
                <td>Строк:</td>
                <td>{setting.rows}</td>
            </tr> :
            <tr>
                <td>Кол-во раз:</td>
                <td>{setting.times}</td>
                <td>Время:</td>
                <td>{setting.time} с.</td>
            </tr>
        }
        {!isMultiplication ?
            <tr>
                <td>Тема:</td>
                <td>{setting.theme}</td>
                {setting.anzan === 'list' ?
                    <>
                        <td>Время:</td>
                        <td>{setting.time} м.</td>
                    </> :
                    <td colSpan={2}/>
                }
            </tr> :
            null}
    </>;
};

export default React.memo(AnzanSettingBlock);