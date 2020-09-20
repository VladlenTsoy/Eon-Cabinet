import React from 'react';
import {Select} from 'antd';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {languageSelector} from "../../../store/common/language/languageSlice";
import {fetchLanguage} from "../../../store/common/language/fetchLanguage";

const HeaderStyled = styled.div`
    margin-right: 1rem;
    margin-left: auto;
    margin-bottom: .5rem;
`;

const {Option} = Select;

const HeaderLanguage = () => {
    const language = useSelector(languageSelector);
    const dispatch = useDispatch();

    const handlerChange = (abbr: any) => {
        dispatch(fetchLanguage(abbr));
    }

    return <HeaderStyled>
        <Select defaultValue={language.abbr} onChange={handlerChange}>
            {language.languages.map((lang) =>
                <Option value={lang.abbr} key={lang.id}>
                    <img src={lang.url_icon} alt={lang.title} width="20px"/> {lang.title}
                </Option>
            )}
        </Select>
    </HeaderStyled>;
};

export default HeaderLanguage;