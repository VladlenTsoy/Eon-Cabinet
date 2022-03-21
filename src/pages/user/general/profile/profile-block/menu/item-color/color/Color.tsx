import * as React from "react";
import './Color.less';
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateUser} from "store/user/updateUser";
import {User} from "../../../../../../../../lib/types/common/User";

interface ColorProps {
    currentUser: User
}

const ColorModalBlock:React.FC<ColorProps> = ({currentUser}) => {
    const [currentColor, setCurrentColor] = useState<User["setting"]["anzanColor"]>(currentUser.setting.anzanColor)
    const dispatch = useDispatch()

    const changeColor = async (color: User["setting"]["anzanColor"]) => {
        setCurrentColor(color)
        await dispatch(updateUser({
            userId: currentUser.id,
            data: {setting: {...currentUser.setting, anzanColor: color}}
        }))
    };

    return <div className="color-modal-block">
        <div className={currentColor} id="output-int-color">
            1
        </div>
        <div className="block-select-color">
            <div
                className={`black ${currentColor === 'black' && 'active'}`}
                onClick={() => changeColor('black')}
            />
            <div
                className={`red ${currentColor === 'red' && 'active'}`}
                onClick={() => changeColor('red')}
            />
            <div
                className={`purple ${currentColor === 'purple' && 'active'}`}
                onClick={() => changeColor('purple')}
            />
            <div
                className={`dark-purple ${currentColor === 'dark-purple'&& 'active'}`}
                onClick={() => changeColor('dark-purple')}
            />
            <div
                className={`light-blue ${currentColor === 'light-blue'&& 'active'}`}
                onClick={() => changeColor('light-blue')}
            />
            <div
                className={`green ${currentColor === 'green'&& 'active'}`}
                onClick={() => changeColor('green')}
            />
            <div
                className={`yellow ${currentColor === 'yellow'&& 'active'}`}
                onClick={() => changeColor('yellow')}
            />
        </div>
    </div>;
};

export default ColorModalBlock;
