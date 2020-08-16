import React from 'react';
import {IoMdMoon, IoMdSunny} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../../../../../store/common/user/userSlice";
import {updateUser} from "../../../../../../store/common/user/updateUser";
import {changeIsDark} from "../../../../../../store/common/app/appSlice";

const DarkSwitch: React.FC = () => {
    const user = useSelector(userSelector);
    const isDark = user.detail?.setting?.is_dark;
    const dispatch = useDispatch();

    const handlerChange = async () => {
        dispatch(changeIsDark(!isDark))
        dispatch(updateUser({
            userId: user.detail?.id,
            data: {setting: {...user.detail?.setting, is_dark: !isDark}}
        }))
    };

    return <div onClick={handlerChange}>
        <span className="anticon invert">
            {isDark ? <IoMdSunny/> : <IoMdMoon/>}
        </span>
        {isDark ? 'Выкл. ночной режим' : 'Вкл. ночной режим'}
    </div>
};

export default DarkSwitch;