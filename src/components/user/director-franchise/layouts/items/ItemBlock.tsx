import React from "react";
import { LockOutlined, ThunderboltOutlined, UnlockOutlined } from '@ant-design/icons';
import { message, Modal } from "antd";
import {useSelector} from "react-redux";

interface ItemBlockProps {
    user: any;
    afterAction?: () => void;
}

const ItemBlock: React.FC<ItemBlockProps> = ({user, afterAction}) => {
    const [api, currentUser] = useSelector((state: any) => [state.api, state.user]);

    const activationAccount = async (teacher: any) => {
        Modal.confirm({
            title: `Активировать (${teacher.last_name} ${teacher.first_name})`,
            content: `Вы действительно хотите активировать пользователя (${teacher.last_name} ${teacher.first_name})?`,
            okType: 'danger',
            async onOk() {
                try {
                    const response = await api.user_general.post(`teacher/${teacher.id}/activation`);
                    if (response.data.status === 'success')
                        message.info(`Вы успешно активировали аккаунт ID: ${teacher.id}.`);
                } catch (e) {
                    message.error(`Произошла неизвестная ошибка!`);
                }
                if(afterAction)
                afterAction();
            }
        });
    };

    const blockAccount = (teacher: any) => {
        if (teacher.day_unblock === 0 || teacher.day_unblock === null || currentUser.access === 'admin')
            Modal.confirm({
                title: `Заблокировать (${teacher.last_name} ${teacher.first_name})`,
                content: `Вы действительно хотите заблокировать пользователя (${teacher.last_name} ${teacher.first_name})?`,
                okType: 'danger',
                async onOk() {
                    try {
                        const response = await api.user_general.post(`${teacher.id}/block`);
                        if (response.data.status === 'success')
                            message.info(`Вы успешно заблокировали аккаунт ID: ${teacher.id}.`);
                    } catch (e) {
                        message.error(`Произошла неизвестная ошибка!`);
                    }
                    if(afterAction)
                    afterAction();
                }
            });
        else
            Modal.warning({
                title: `Не удается заблокировать!`,
                content: `Вы сможете заблокировать пользователя (${teacher.last_name} ${teacher.first_name}) через ${teacher.day_unblock} дней.`,
            });
    };

    const unblockAccount = (teacher: any) => {
        if (teacher.day_block === 0 || teacher.day_block === null || currentUser.access === 'admin')
            Modal.confirm({
                title: `Разблокировать (${teacher.last_name} ${teacher.first_name})`,
                content: `Вы действительно хотите разблокировать пользователя (${teacher.last_name} ${teacher.first_name})?`,
                okType: 'danger',
                async onOk() {
                    try {
                        const response = await api.user_general.post(`${teacher.id}/unblock`);
                        if (response.data.status === 'success')
                            message.info(`Вы успешно заблокировали аккаунт ID: ${teacher.id}.`);
                    } catch (e) {
                        message.error(`Произошла неизвестная ошибка!`);
                    }
                    if(afterAction)
                    afterAction();
                }
            });
        else
            Modal.warning({
                title: `Не удается разблокировать!`,
                content: `Вы сможете разблокировать пользователя (${teacher.last_name} ${teacher.first_name}) через ${teacher.day_block} дней.`,
            });
    };

    if (user.status === 'test')
        return (
            <div onClick={() => activationAccount(user)}>
                <ThunderboltOutlined /> Активировать
            </div>
        );

    return user.is_blocked ?
        <div onClick={() => unblockAccount(user)}>
            <UnlockOutlined /> Разблокировать
        </div> :
        <div onClick={() => blockAccount(user)}>
            <LockOutlined /> Заблокировать
        </div>;
};

export default ItemBlock;