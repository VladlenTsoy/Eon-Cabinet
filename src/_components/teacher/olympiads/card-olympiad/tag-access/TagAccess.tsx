import React from 'react';
import {Tag} from "antd";

interface TagAccessProps {
    access: 'public' | 'invite' | 'private'
}

const TagAccess: React.FC<TagAccessProps> = ({access}) => {
    return access === 'public' ?
        <Tag color="#5cb860">Открытый</Tag> :
        access === 'invite' ?
            <Tag color="#ff9800">Запрос</Tag> :
            <Tag color="#f55a4e">Закрытый</Tag>;
};

export default TagAccess;