import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {Input} from "antd";

interface HeaderTableProps {
    pagination: any;
    handleTableChange: any;
}

const HeaderWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const HeaderActionWrapper = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const HeaderTablePagination: React.FC<HeaderTableProps> = ({pagination, handleTableChange, children}) => {
    const searchInput = useRef<any>(null);
    const [timer, setTimer] = useState<any>(0);

    const search = () => {
        clearTimeout(timer);
        let search = searchInput.current.state.value;
        setTimer(setTimeout(() => handleTableChange(pagination, {}, {}, {}, search), 1000));
    };

    return <HeaderWrapper>
        {
            children ?
                <HeaderActionWrapper>
                    {children}
                </HeaderActionWrapper> :
                null
        }
        <Input placeholder="Поиск" onKeyUp={search} ref={searchInput}/>
    </HeaderWrapper>
};

export default HeaderTablePagination;