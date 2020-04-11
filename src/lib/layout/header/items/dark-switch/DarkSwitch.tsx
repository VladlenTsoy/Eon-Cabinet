import React from 'react';
import {IoMdMoon, IoMdSunny} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Switch} from "antd";
import {setCurrentUserData} from "../../../../../store/user/actions";
import {appChangeSpin} from "../../../../../store/app/actions";

const SwitchWrapper = styled(Switch)`
  .ant-switch-inner{
    font-size: 17px;
    line-height: 25px;
  }
`;

const DarkSwitch: React.FC = () => {
    const {api, user} = useSelector((state: any) => (state));
    const dispatch = useDispatch();

    const handlerChange = async (state: boolean) => {
        dispatch(appChangeSpin(true));
        const response = await api.user_general.patch(`/${user.id}`, {setting: {...user.setting, is_dark: state}});
        await dispatch(setCurrentUserData(response.data));
        setTimeout(() => dispatch(appChangeSpin(false)), 1000);
    };

    return <SwitchWrapper
        defaultChecked={user.setting.is_dark}
        onChange={handlerChange}
        checkedChildren={<IoMdMoon/>}
        unCheckedChildren={<IoMdSunny/>}
    />;
};

export default DarkSwitch;