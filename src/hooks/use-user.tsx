import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {userSelector} from "../store/common/user/userSlice";
import {logoutUser} from "../store/common/user/logoutUser"
import {QuestionCircleOutlined} from "@ant-design/icons"
import {Modal} from "antd"
import {useCallback} from "react"

const confirm = Modal.confirm

export const useUser = (): any => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const updateUser = () => {}

    // Выход
    const logout = useCallback(() => {
        confirm({
            zIndex: 1002,
            title: "Вы действительно хотите выйти?",
            icon: <QuestionCircleOutlined />,
            onOk: async () => {
                dispatch(logoutUser());
            }
        })
    }, [])

    return {
        userId: user.detail?.id,
        user: user.detail,
        updateUser,
        logout,
        token: user.token,
        loading: user.loading
    };
};