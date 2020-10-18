import React, {useState} from 'react';
import {Button} from "lib/ui";

interface SendingMessageProps {
    updateIsSent: any;
    close: any;
}

// TODO - api
const SendingMessage: React.FC<SendingMessageProps> = ({updateIsSent, close}) => {
    const [loading, setLoading] = useState(false);

    const sendingMessageHandler = async () => {
        try {
            setLoading(true);
            // let response = await api.user.post('/sending-message');
            // if (response.data.status === 'success') {
            //
            //     return updateIsSent(true);
            // }
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    return <>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur
            adipisicing
            elit.</p>
        <Button
            className="confirm-button"
            type="primary"
            block
            onClick={sendingMessageHandler}
            loading={loading}
        >
            Отправить код подтверждения
        </Button>
        <Button type="link" block onClick={close}>Позже</Button>
    </>;
};

export default SendingMessage;