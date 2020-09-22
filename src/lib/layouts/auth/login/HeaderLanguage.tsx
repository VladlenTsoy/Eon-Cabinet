import React from 'react';
import styled from "styled-components";
import SelectLanguage from "../components/select-language/SelectLanguage"

const HeaderStyled = styled.div`
    margin-right: 1rem;
    margin-left: auto;
    margin-bottom: .5rem;
`;

const HeaderLanguage = () => {
    return <HeaderStyled>
        <SelectLanguage/>
    </HeaderStyled>;
};

export default HeaderLanguage;