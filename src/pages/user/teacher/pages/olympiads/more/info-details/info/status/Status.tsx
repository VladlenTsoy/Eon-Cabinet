import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import BlockWrapper from "../layouts/Block.layout";

interface StatusProps {
    olympiad: any;
}

const Status: React.FC<StatusProps> = ({olympiad}) => {
    return (
        <BlockWrapper>
            <ClockCircleOutlined />
            <div>
                <span>Текущий статус:</span>
                {olympiad.status === 'waiting' ? <p>Олимпиада еще не началась.</p> : null}
                {olympiad.status === 'completed' ? <p>Олимпиада звершена.</p> : null}
                {olympiad.status === 'canceled' ? <p>Олимпиада отмененна.</p> : null}
                {olympiad.status === 'processing' ? <p>Олимпиада в процессе.</p> : null}
            </div>
        </BlockWrapper>
    );
};

export default Status;