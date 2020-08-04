import React from "react";
import { MessageOutlined } from '@ant-design/icons';
import {Alert} from "lib/components";
import moment from 'moment'
import styled from "styled-components";
import {AlertProps} from "antd/es/alert";

const MessageWrapper: React.FC<AlertProps> = styled(Alert)`
  order: 2;
  
  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 3;
    order: 3;
    
    &.ant-alert-with-description {
      .ant-alert-message{
        font-size: 14px;
      }
    }
  }
`;

interface MessageProps {
    homework: any;
}

const Message: React.FC<MessageProps> = ({homework}) => {
    return (
      <MessageWrapper
          type="info"
          message={homework.message}
          // message={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias aut, commodi distinctio enim eos est, et, facilis fugit minima modi molestiae necessitatibus nemo nostrum nulla sequi suscipit tempora temporibus!'}
          description={moment(homework.created_at).format('DD/MM/YYYY, HH:mm')}
          icon={<MessageOutlined />}
          showIcon
          style={{
              marginBottom: 0
          }}
      />
    );
};

export default Message;