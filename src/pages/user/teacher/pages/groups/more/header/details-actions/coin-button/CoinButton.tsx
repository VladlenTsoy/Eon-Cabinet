import React, {useState} from 'react';
import {FormItem, Modal} from "lib/ui";
import CoinSvg from "assets/images/icons/coin.svg";
import {Form} from "antd";
import {Stepper, Button} from "lib/ui";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {sendCoins} from "store/access/teacher/students/sendСoins";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../Group";
import {useSelectSelectedStudentsByIdsGroupId} from "store/access/teacher/students/studentsSelectors";

const ImageStyled = styled.div`
  margin-bottom: 1rem;
  
  img{
    width: 100px;
  }
`;

const IconCoinStyled = styled.span`
    display: inline-block;
    width: 22px;
    height: 22px;

    img {
        width: 100%;
        height: 100%;
    }
`

const CoinButton: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const dispatch = useDispatch()
    const selectedIds = useSelectSelectedStudentsByIdsGroupId(Number(id))

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const submitHandler = async (values: any) => {
        setLoading(true);
        await dispatch(sendCoins({...values, ids: selectedIds}))
        setLoading(false)
        setVisible(false)
    }

    return <>
        <Button
            type="second"
            size="large"
            icon={
                <IconCoinStyled>
                    <img src={CoinSvg} alt="монеты" />
                </IconCoinStyled>
            }
            onClick={open}
        >
            Монеты
        </Button>
        <Modal
            title="Отправить монеты"
            visible={visible}
            onCancel={close}
            width="350px"
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