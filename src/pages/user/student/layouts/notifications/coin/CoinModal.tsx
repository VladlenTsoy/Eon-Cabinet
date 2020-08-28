import React, {useState} from 'react';
import {Modal} from "../../../../../../lib/ui";
import CoinSvg from "../../../../../../assets/images/icons/coin.svg";
import styled from "styled-components";
import {Button, Typography} from "antd";
import BgRays from "../../../../../../lib/layouts/pages/result/layouts/bg-rays/BgRays";

const {Title} = Typography;

const ContentStyled = styled.div`
  overflow: hidden;
  text-align: center;
  position: relative;
`;

const ImageStyled = styled.div`
  margin-bottom: 1rem;
  
  img{
    width: 100px;
  }
`;

interface CoinModalProps {
    coin: any
}

// TODO - api
const CoinModal: React.FC<CoinModalProps> = ({coin}) => {
    const [visible, setVisible] = useState(true);


    const close = async () => {
        setVisible(false);
        // await api.user.get(`/student/coin/${coin.id}/view`)
    }

    return <>
        <Modal
            visible={visible}
            onCancel={close}
        >
            <BgRays color='rgba(255, 175, 56, 0.2)' delay={1000}/>
            <ContentStyled>
                <Title level={2}>Вы получили монеты!</Title>
                <ImageStyled className="animated fadeInUp">
                    <img src={CoinSvg} alt="монеты"/>
                </ImageStyled>
                <Title level={4}>Кол-во: {coin.coin} шт.</Title>
                <Button type="primary" size="large" onClick={close}>Ок</Button>
            </ContentStyled>
        </Modal>
    </>;
};

export default CoinModal;