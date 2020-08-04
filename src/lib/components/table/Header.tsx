import React from 'react';
import styled from "styled-components";
import {Input} from "antd";

interface HeaderTableProps {
    search: any;
    searchInput: any;
}

const HeaderWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const HeaderActionWrapper = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const HeaderTable: React.FC<HeaderTableProps> = ({search, searchInput, children}) => {
    return <HeaderWrapper>
        {children ? <HeaderActionWrapper>
            {children}
        </HeaderActionWrapper> : null}
        <Input placeholder="Поиск" onKeyUp={search} ref={searchInput}/>
    </HeaderWrapper>
};

export default HeaderTable;