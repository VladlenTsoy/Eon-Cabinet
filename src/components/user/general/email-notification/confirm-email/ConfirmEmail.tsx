import React, {useState} from 'react';
import styled from "styled-components";
import {Typography} from "antd";
import ConfirmEmailBg from "../../../../../assets/images/pages/confirm_email.svg";
import FormVerificationCode from "./FormVerificationCode";
import SendingMessage from "./SendingMessage";
import SuccessfulResult from "./SuccessfulResult";

const {Title} = Typography;

const SendingMessageWrapper = styled.div`
  text-align: center;
  padding: 1rem 0 0;
  
  .image-wrapper{
    width: 250px;
    margin: 2rem auto;
  }
  
  p{
    margin-bottom: 1rem;
  }
  
  .confirm-button{
    margin-bottom: 1rem;
  }
`;

interface SendingMessageProps {
    close: any;
    changeDataCurrentUser: any;
}

const ConfirmEmail: React.FC<SendingMessageProps> = ({close, changeDataCurrentUser}) => {
    const [isSent, setIsSent] = useState(false);
    const [result, setResult] = useState(false);

    const updateIsSent = (state: boolean) => setIsSent(state);
    const updateResult = (state: boolean) => setResult(state);

    return <SendingMessageWrapper>
        {result ?
            <SuccessfulResult close={close}/> :
            <>
                <Title level={3}>Потвердите почту</Title>
                <div className="image-wrapper">
                    <img src={ConfirmEmailBg} width="100%" alt="email-input"/>
                </div>
                {isSent ?
                    <FormVerificationCode updateResult={updateResult} changeDataCurrentUser={changeDataCurrentUser}/> :
                    <SendingMessage updateIsSent={updateIsSent} close={close}/>
                }
            </>
        }
    </SendingMessageWrapper>;
};

export default ConfirmEmail;