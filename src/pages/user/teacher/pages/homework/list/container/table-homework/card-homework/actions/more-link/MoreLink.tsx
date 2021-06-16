import React, {useState} from 'react';
import {Alert, Modal} from "lib/ui";
import {Input, message} from "antd";
import {LinkOutlined, CopyOutlined} from "@ant-design/icons";

interface MoreLinkProps {
    homework: any;
}

const MoreLink: React.FC<MoreLinkProps> = ({children, homework}) => {
    const [visible, setVisible] = useState<boolean>(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const copy = async (value: any) => {
        await navigator.clipboard.writeText(value)
            .then(() => message.success('Ссылка скопирована!'))
            .catch(err => {
                message.error('Неизвестная ошибка!');
                console.log('Something went wrong', err);
            });
    }

    return <>
        <span onClick={open}>{children}</span>
        <Modal
            closable={false}
            visible={visible}
            onCancel={close}
        >
            <Alert message="Ссылка на домашннее задание" showIcon type="info"
                   description="Данная ссылка позволяет пройти домашнее задание не регистрируясь"/>
            <Input.Search
                addonBefore={<LinkOutlined/>}
                enterButton={<><CopyOutlined/> Скопировать</>}
                defaultValue={`https://cabinet.eon.uz/guest/homework/${homework.id}`}
                onSearch={copy}
            />
        </Modal>
    </>;
};

export default MoreLink;


