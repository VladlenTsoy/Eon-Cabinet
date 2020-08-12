import React from 'react';
import {IoMdMoon, IoMdSunny} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {Switch} from "antd";
import {changeSpin} from "../../../../../../store/common/app/appSlice";
import {userSelector} from "../../../../../../store/common/user/userSlice";
import {updateUser} from "../../../../../../store/common/user/updateUser";

const SwitchWrapper = styled(Switch)`
  .ant-switch-inner{
    font-size: 17px;
    line-height: 25px;
  }
`;

const DarkSwitch: React.FC = () => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const handlerChange = async (state: boolean) => {
        dispatch(changeSpin(true))
        dispatch(updateUser({userId: user.detail?.id, data: {setting: {...user.detail?.setting, is_dark: state}}}))
        setTimeout(() => dispatch(changeSpin(false)), 1000)
    };

    return <SwitchWrapper
        defaultChecked={user.detail?.setting?.is_dark}
        onChange={handlerChange}
        checkedChildren={<IoMdMoon/>}
        unCheckedChildren={<IoMdSunny/>}
    />;
};

export default DarkSwitch;