import React from 'react';
import {IoMdMoon, IoMdSunny} from "react-icons/all";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import {Switch} from "antd";
import {appChangeSpin} from "../../../../../store/reducers/common/app/actions";
import {useAppContext} from "../../../../../store/context/use-app-context";

const SwitchWrapper = styled(Switch)`
  .ant-switch-inner{
    font-size: 17px;
    line-height: 25px;
  }
`;

const DarkSwitch: React.FC = () => {
    const {api, user, updateUser} = useAppContext();
    const dispatch = useDispatch();

    const handlerChange = async (state: boolean) => {
        dispatch(appChangeSpin(true));
        const response = await api.user.patch(`/${user.id}`, {setting: {...user.setting, is_dark: state}});
        await updateUser(response.data);
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