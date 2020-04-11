import React from "react";
import CountryItems from "./CountryItems";
import usingDrawerEditor from "../../../../../layouts/drawer-editor/usingDrawerEditor";
import {message} from "antd";
import {useSelector} from "react-redux";

const EditorButton = usingDrawerEditor(CountryItems);

interface EditorCountryButtonProps {
    title: string;
    country?: any;
    fetch: any;
}

const EditorCountryButton: React.FC<EditorCountryButtonProps> = ({title, children, country, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (country) {
            await api.user_general.post(`admin/country/${country.id}`, values);
            message.success("Вы успешно изменили страну!");
        } else {
            await api.user_general.post(`admin/country`, values);
            message.success("Вы успешно добавили страну!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={country ? {
            country: country.country,
            capital: country.capital,
            description: country.description,
            flag: country.url_flag,
            emblem: country.url_emblem,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorCountryButton;