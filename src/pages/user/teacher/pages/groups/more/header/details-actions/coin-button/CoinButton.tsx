import React, {useState} from 'react';
import CoinSvg from "assets/images/icons/coin.svg";
import {Form} from "antd";
import {FormItem, Modal, info, Stepper, Button} from "lib/ui";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {sendCoins} from "store/students/sendСoins";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../Group";
import {useSelectSelectedStudentsByIdsGroupId} from "store/students/studentsSelectors";
import checkStudentGif from "../../../../../../../../../assets/images/hints/check-student.gif"

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

    const disabledHandler = () => {
        info({
            title: 'Выберите учеников!',
            content: <>
                <p>Отметьте учеников в списке для отправки домашнего задания.</p>
                <img src={checkStudentGif} alt="Выберите учеников!" width="100%"/>
            </>,
            okText: 'Ок'
        });
    };

    return <>
        <Button
            type="second"
            size="large"
            icon={
                <IconCoinStyled>
                    <img src={CoinSvg} alt="монеты" />
                </IconCoinStyled>
            }
            onClick={selectedIds.length ? open : disabledHandler}
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
