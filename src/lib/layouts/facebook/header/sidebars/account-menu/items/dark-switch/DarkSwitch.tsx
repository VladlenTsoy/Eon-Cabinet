import React from 'react';
import {IoMdMoon, IoMdSunny} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, changeIsDark} from "../../../../../../../../store/common/app/appSlice";

const DarkSwitch: React.FC = () => {
    const {isDark} = useSelector(appSelector);
    const dispatch = useDispatch();

    const handlerChange = () => {
        dispatch(changeIsDark(!isDark))
    };

    return <div onClick={handlerChange}>
        <span className="anticon invert">
            {isDark ? <IoMdSunny/> : <IoMdMoon/>}
        </span>
        {isDark ? 'Выкл. ночной режим' : 'Вкл. ночной режим'}
    </div>
};

export default DarkSwitch;