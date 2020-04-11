import * as React from "react";
import './Color.less';
import {useState} from "react";
import {message} from "antd";
import {useSelector} from "react-redux";

const ColorModalBlock = ({currentUser, changeDataCurrentUser}: any) => {
    const {api, language} = useSelector((state: any) => state);
    const [currentColor, setCurrentColor] = useState(currentUser.setting.anzanColor);

    const changeColor = async (color: string) => {
        setCurrentColor(color);
        currentUser.setting.anzanColor = color;

        try{
            const response = await api.user_general.patch(`/${currentUser.id}`, {setting: currentUser.setting});
            changeDataCurrentUser(response.data);
            message.success('Вы успешно изменили цвет!');
        } catch (e) {
            message.error(language.common['cx002']);
        }
    };

    return <div className="color-modal-block">
        <div className={currentColor} id="output-int-color">
            1
        </div>
        <div className="block-select-color">
            <div className={`black ${currentColor === 'black'? 'active': ''}`} onClick={() => changeColor('black')}/>
            <div className={`red ${currentColor === 'red'? 'active': ''}`} onClick={() => changeColor('red')}/>
            <div className={`purple ${currentColor === 'purple'? 'active': ''}`} onClick={() => changeColor('purple')}/>
            <div className={`dark-purple ${currentColor === 'dark-purple'? 'active': ''}`} onClick={() => changeColor('dark-purple')}/>
            <div className={`light-blue ${currentColor === 'light-blue'? 'active': ''}`} onClick={() => changeColor('light-blue')}/>
            <div className={`green ${currentColor === 'green'? 'active': ''}`} onClick={() => changeColor('green')}/>
            <div className={`yellow ${currentColor === 'yellow'? 'active': ''}`} onClick={() => changeColor('yellow')}/>
        </div>
    </div>;
};

export default ColorModalBlock;