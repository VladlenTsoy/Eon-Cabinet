import React from 'react';
import { GlobalOutlined, PlusCircleOutlined, SlidersOutlined, TeamOutlined } from '@ant-design/icons';
import styled from "styled-components";

const ModsConfigWrapper = styled.div`
  color: ${props => props.theme.color_warning};
  display: flex;
  justify-content: space-around;
  padding: 0 0 1rem;
  font-size: 16px;
`;

interface ModsConfigProps {
    setting: any;
}

const ModsConfig: React.FC<ModsConfigProps> = ({setting}) => {
    return (
        <ModsConfigWrapper>
            {setting.extra.includes('plus') ? <PlusCircleOutlined /> : null}
            {setting.extra.includes('group') ? <TeamOutlined /> : null}
            {setting.extra.includes('comma') ? <GlobalOutlined /> : null}
            {setting.extra.includes('abacus') ? <SlidersOutlined /> : null}
        </ModsConfigWrapper>
    );
};

export default ModsConfig;