import React from 'react';
import styled from "styled-components";
import { SoundOutlined, StopOutlined } from '@ant-design/icons';

const SoundConfigWrapper = styled.div`
  color: ${props => props.theme.color_danger};
  display: flex;
  justify-content: space-around;
  padding: 0 0 1rem;
  font-size: 16px;
  .anticon-stop{
    color: ${props => props.theme.color_second};
  }
`;

interface SoundConfigProps {
    setting: any;
}

const SoundConfig: React.FC<SoundConfigProps> = ({setting}) => {
    const sound = () => {
        switch (String(setting.sound)) {
            case 'none':
                return <StopOutlined />;
            case 'basic':
                return <SoundOutlined />;
            case 'ru':
                return <span>RU</span>;
            case 'en':
                return <span>EN</span>
        }
    };
    return <SoundConfigWrapper>
        {sound()}
    </SoundConfigWrapper>;
};

export default SoundConfig;