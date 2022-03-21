import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {userSelector} from "store/user/userSlice";
import {logoutUser} from "store/user/logoutUser"
import {QuestionCircleOutlined} from "@ant-design/icons"
import {confirm} from "lib/ui"
import {useCallback} from "react"

type Props = () => any

// {
//     userId: User['id'] | undefined,
//         user: User | null,
//     updateUser: (data: any) => void,
//     logout: () => void,
//     token: string | null,
//     loading: boolean
// }

export const useUser:Props = () => {
    const user = useSelector(userSelector)
    const dispatch = useDispatch()

    const updateUser = () => {}

    // Выход
    const logout = useCallback(async () => {
        await confirm({
            zIndex: 1002,
            title: "Вы действительно хотите выйти?",
            icon: <QuestionCircleOutlined />,
            onOk: async () => {
                dispatch(logoutUser());
            },
            okText: 'Да',
            cancelText: 'Нет',
        })
    }, [dispatch])

    return {
        userId: user.detail?.id,
        user: user.detail,
        updateUser,
        logout,
        token: user.token,
        loading: user.loading
    };
};
