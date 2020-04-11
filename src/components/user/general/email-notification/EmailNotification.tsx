import React, {useState} from 'react';
import {Modal} from "../../../../layouts/components";
import {useDispatch, useSelector} from "react-redux";
import EmailInput from "./EmailInput";
import ConfirmEmail from "./confirm-email/ConfirmEmail";
import {setCurrentUserData} from "../../../../store/user/actions";

const EmailNotification: React.FC = () => {
    const {user} = useSelector((state: any) => state);
    const [visible, setVisible] = useState(!user.email_verified_at);
    const dispatch = useDispatch();

    const close = () => setVisible(false);
    const updateUser = (data: any) => dispatch(setCurrentUserData(data));

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