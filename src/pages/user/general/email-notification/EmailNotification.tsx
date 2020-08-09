import React, {useState} from 'react';
import {Modal} from "../../../../lib/components";
import EmailInput from "./EmailInput";
import ConfirmEmail from "./confirm-email/ConfirmEmail";
import {useUser} from "../../../../hooks/use-user";

const EmailNotification: React.FC = () => {
    const {user, updateUser} = useUser();
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