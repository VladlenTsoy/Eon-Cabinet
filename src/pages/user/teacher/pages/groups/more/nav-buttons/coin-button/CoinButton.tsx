import React, {useState} from 'react';
import {FormItem, Modal, NavigationButton} from "lib/ui";
import {PlusCircleOutlined} from "@ant-design/icons";
import CoinSvg from "assets/images/icons/coin.svg";
import {Button, Form} from "antd";
import Stepper from "../../../../../../../../lib/ui/stepper/Stepper";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {sendCoins} from "../../../../../../../../store/access/teacher/students/sendСoins";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../Group";
import {useSelectSelectedStudentsByIdsGroupId} from "../../../../../../../../store/access/teacher/students/studentsSelectors";

const ImageStyled = styled.div`
  margin-bottom: 1rem;
  
  img{
    width: 100px;
  }
`;

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
        <NavigationButton
            type="primary"
            icon={<PlusCircleOutlined/>}
            onClick={open}
            disabled={!selectedIds.length}
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