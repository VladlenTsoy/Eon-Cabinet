import React, {useState} from 'react';
import {Modal} from "../../../../lib";
import EmailInput from "./EmailInput";
import ConfirmEmail from "./confirm-email/ConfirmEmail";
import {useAppContext} from "../../../../store/context/use-app-context";

const EmailNotification: React.FC = () => {
    const {user, updateUser} = useAppContext();
    const [visible, setVisible] = useState(!user.email_verified_at);

    const close = () => setVisible(false);

    return <>
        <Modal
            visible={visible}
            closable={false}
            onCancel={close}
        >
            {user.email ?
                <ConfirmEmail close={close} changeDataCurrentUser={updateUser}/> :
                <EmailInput currentUser={user} changeDataCurrentUser={updateUser}/>}
        </Modal>
    </>;
};

export default EmailNotification;