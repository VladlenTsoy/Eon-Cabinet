import React from 'react';
import {Tag} from "antd";

interface OlympiadTagAccessProps {
    access: 'public' | 'invite' | 'private'
}

const OlympiadTagAccess: React.FC<OlympiadTagAccessProps> = ({access}) => {
    return access === 'public' ?
        <Tag color="#5cb860">Открытый</Tag> :
        access === 'invite' ?
            <Tag color="#ff9800">Запрос</Tag> :
            <Tag color="#f55a4e">Закрытый</Tag>;
};

export default React.memo<OlympiadTagAccessProps>(OlympiadTagAccess);