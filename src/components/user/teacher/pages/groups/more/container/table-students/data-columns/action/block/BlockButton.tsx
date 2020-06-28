import React from 'react';
import {useAppContext} from "store/context/use-app-context";
import { LockOutlined } from '@ant-design/icons';
import {Button, Modal, Popover} from "antd";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../../../../../../../hooks/use-screen-window.effect";

interface BlockButtonProps {
    student: any;
    fetch: () => void;
}

const PopoverContent = styled.div`
  width: 200px;
`;

const BlockButton: React.FC<BlockButtonProps> = ({student, fetch}) => {
    const {api} = useAppContext();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const clickHandler = () => {
        Modal.confirm({
            title: `Заблокировать (${student.first_name} ${student.last_name})?`,
            content: `Ученику (${student.first_name} ${student.last_name}) будет 
            заблокирован доступ к его личному кабинету,
             разблокировать возможно только после 20 дней или оплаты.`,
            onOk: async () => {
                await api.user.post(`/${student.id}/block`);
                fetch();
            }
        });
    };

    const popover = (child: any) => {
        return isBreakpoint ? child : <Popover
            title="Заблокировать"
            content={
                <PopoverContent>
                    Блокировка ученика действует минимум на 20 дней или до оплаты.
                </PopoverContent>
            }
        >
            {child}
        </Popover>;
    };

    return popover(
        <Button shape="circle" icon={<LockOutlined />} size="large" onClick={clickHandler}/>
    );
};

export default BlockButton;