import React from 'react';
import {PrinterOutlined} from "@ant-design/icons";
import {message} from "antd";

interface PrintItemProps {
    record: any;
}

// TODO - api
const PrintItem: React.FC<PrintItemProps> = () => {
    const clickHandler = async () => {
        const hide = message.loading('Загрузка файла...', 0);
        hide();
        message.success(`Файл сохранен!`);
    };

    return <div onClick={clickHandler}>
        <PrinterOutlined/>
        <span>Распечатать</span>
    </div>;
};

export default PrintItem;