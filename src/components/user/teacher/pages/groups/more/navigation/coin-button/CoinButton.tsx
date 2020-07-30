import React, {useState} from 'react';
import {FormItem, Modal, NavigationButton} from "lib";
import {PlusCircleOutlined} from "@ant-design/icons";
import CoinSvg from "assets/images/icons/coin.svg";
import {Button, Form, message} from "antd";
import Stepper from "../../../../../../../../lib/stepper/Stepper";
import styled from "styled-components";
import {useAppContext} from "../../../../../../../../store/context/use-app-context";

const ImageStyled = styled.div`
  margin-bottom: 1rem;
  
  img{
    width: 100px;
  }
`;

interface CoinButtonProps {
    fetchUsers: () => void;
    selectUsersId: number[];
}

const CoinButton: React.FC<CoinButtonProps> = ({selectUsersId, fetchUsers}) => {
    const {api} = useAppContext();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const submitHandler = async (values: any) => {
        setLoading(true);
        try {
            const response = await api.user.post('/teacher/coin/sent', {...values, ids: selectUsersId});
            if (response.data.status === 'success')
                message.success('Вы успешно отправили монеты!')
            setLoading(false)
            setVisible(false)
            fetchUsers()
        } catch (e) {
            message.error('Неизвестная ошибка!');
            setLoading(false);
        }
    }

    return <>
        <NavigationButton
            type="primary"
            icon={<PlusCircleOutlined/>}
            onClick={open}
            disabled={!selectUsersId.length}
        >
            Монеты
        </NavigationButton>
        <Modal
            title="Отправить монеты"
            visible={visible}
            onCancel={close}
        >
            <Form layout="vertical" style={{textAlign: 'center'}} initialValues={{coin: 1}} onFinish={submitHandler}>
                <ImageStyled>
                    <img src={CoinSvg} alt="монеты"/>
                </ImageStyled>
                <FormItem
                    name="coin"
                    requiredMsg="Введите количество монет!"
                >
                    <Stepper min={1}/>
                </FormItem>
                <Button type="primary" size="large" htmlType="submit" block loading={loading}>Отправить</Button>
            </Form>
        </Modal>
    </>;
};

export default CoinButton;