import React from 'react';
import {PrinterOutlined} from "@ant-design/icons";
// import {pdfRender} from "../../../../../training/tasks/print/general";
import {useAppContext} from "store/context/use-app-context";
import {message} from "antd";

interface PrintItemProps {
    record: any;
}

const PrintItem: React.FC<PrintItemProps> = ({record}) => {
    const {api, language} = useAppContext();

    const clickHandler = async () => {
        const hide = message.loading('Загрузка файла...', 0);
        const response = await api.user.get(`custom-exercises/${record.id}/print`);
        const {pdfRender} = await import("../../../../../training/settings/print/general");
        await pdfRender(record.setting, response.data, language.common);
        hide();
        message.success(`Файл сохранен!`);
    };

    return <div onClick={clickHandler}>
        <PrinterOutlined/>
        <span>Распечатать</span>
    </div>;
};

export default PrintItem;