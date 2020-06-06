import React, {useState} from "react";
import { MailOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {Modal} from "../../../../../../lib";
import ConfirmEmail from "../../../email-notification/confirm-email/ConfirmEmail";
import EmailInput from "../../../email-notification/EmailInput";

const VerificationWrapper: any = styled.div`
  color: ${(props: any) => props.danger ? props.theme.color_danger : 'inherit'};
`;

interface ItemEmailVerificationProps {
    currentUser: any;
    changeDataCurrentUser: any;
}

const ItemEmailVerification: React.FC<ItemEmailVerificationProps> = ({currentUser, changeDataCurrentUser}) => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <VerificationWrapper
            {...currentUser.email_verified_at ? null : {onClick: open}}
            danger={!currentUser.email_verified_at}>
            <MailOutlined /> Подтвердить почту
        </VerificationWrapper>
        <Modal
            visible={visible}
            closable={false}
            onCancel={close}
        >
            {currentUser.email ?
                <ConfirmEmail close={close} changeDataCurrentUser={changeDataCurrentUser}/> :
                <EmailInput currentUser={currentUser} changeDataCurrentUser={changeDataCurrentUser}/>}
        </Modal>
    </>;
};

export default ItemEmailVerification;