import React, {useState} from 'react';
import {DownloadOutlined} from "@ant-design/icons";
import {Button, Modal, Typography} from "antd";
import styled from "styled-components";
import {useAppContext} from "../../../../store/context/use-app-context";

const {Title} = Typography;

const InfoStyled = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

interface InfoProps {
    homework: any;
}

const Info: React.FC<InfoProps> = ({homework}) => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(false);

    const clickHandler = async () => {
        setLoading(true);
        const response = await api.guest.post(`guest/homework/${homework.id}/download/result`);
        if (response.data.status === 'error') {
            Modal.warning({
                title: 'Завершите все упражнения!',
            });
            return setLoading(false);
        }
        window.open(response.data.file_url);
        setLoading(false)
    }

    return <InfoStyled>
        <Title level={1}>Уровень #{homework.level}</Title>
        <Button size="large" onClick={clickHandler} loading={loading} icon={<DownloadOutlined/>}>Скачать
            результат</Button>
    </InfoStyled>;
};

export default Info;