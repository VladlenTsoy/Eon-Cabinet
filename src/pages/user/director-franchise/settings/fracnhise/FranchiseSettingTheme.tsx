import React, {useState} from "react";
import {Card} from "lib/components";
import styled from "styled-components";
import { LoadingOutlined } from '@ant-design/icons';
import { message, Radio, Spin } from "antd";

const ThemesWrapper = styled.div`
   padding: 1rem;
`;

const ThemeWrapper = styled.div`
   display: flex;
   align-items: center;
   
   :not(:last-child){
      margin-bottom: 1rem;
   }
`;

const IconWrapper = styled.div`
  border: 3px solid #ffffff;
  height: 50px;
  width: 50px;
  background: ${props => props.color};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadow_primary};
  margin-right: .5rem;

  &:nth-child(2){
    margin-right: 1.5rem;
  }
`;

const TitleWrapper = styled.div`
  
`;

const FranchiseSettingTheme: React.FC<any> = ({franchise, update}) => {
    const [loading, setLoading] = useState(false);

    const changeHandler = async (e: any) => {
        franchise.theme = e.target.value;
        setLoading(true);
        await update(franchise);
        setLoading(false);
        message.success('Вы успешно изменили тему!');
    };

    return (
        <Card>
            <Card.Title level={3} title="Темы"/>
            <Spin spinning={loading} tip="Обновление..." indicator={<LoadingOutlined />}>
                <Radio.Group defaultValue={franchise.theme} onChange={changeHandler}>
                    <ThemesWrapper>
                        <ThemeWrapper>
                            <IconWrapper color="#9C27B0"/>
                            <IconWrapper color="#FF9800"/>
                            <TitleWrapper>
                                <Radio value="default-theme-eon">По умолчанию</Radio>
                            </TitleWrapper>
                        </ThemeWrapper>

                        <ThemeWrapper>
                            <IconWrapper color="#007BFF"/>
                            <IconWrapper color="#FF9800"/>
                            <TitleWrapper>
                                <Radio value="blue-theme-eon">Синяя</Radio>
                            </TitleWrapper>
                        </ThemeWrapper>

                        <ThemeWrapper>
                            <IconWrapper color="#26C6DA"/>
                            <IconWrapper color="#FF9800"/>
                            <TitleWrapper>
                                <Radio value="cyan-theme-eon">Голубая</Radio>
                            </TitleWrapper>
                        </ThemeWrapper>

                        <ThemeWrapper>
                            <IconWrapper color="#FF9800"/>
                            <IconWrapper color="#007BFF"/>
                            <TitleWrapper>
                                <Radio value="orange-theme-eon">Оранжевая</Radio>
                            </TitleWrapper>
                        </ThemeWrapper>

                    </ThemesWrapper>
                </Radio.Group>
            </Spin>
        </Card>
    );
};

export default FranchiseSettingTheme;