import React from 'react';
import { MessageOutlined } from '@ant-design/icons';
import styled from "styled-components";
import BlockLayout from "../layout/Block.layout";

const MessageWrapper = styled(BlockLayout)`
  order: 2;
  grid-column-start: 2;
  grid-column-end: 5;

  @media (max-width: 992px) {
    grid-column-start: 1;
    grid-column-end: 4;
  }  
  
  @media (max-width: 576px) {
    grid-column-start: 1;
    grid-column-end: 2;
  }
`;

interface MessageProps {
    description: string;
}

const Message:React.FC<MessageProps> = ({description}) => {
    return (
        <MessageWrapper>
            <div className="title">
                <MessageOutlined />
                <span>Сообщение</span>
            </div>
            <div className="content">
                {description}
            </div>
        </MessageWrapper>
    );
};

export default Message;