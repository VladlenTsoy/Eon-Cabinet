import React from 'react';
import {Result} from "antd";

interface ErrorProps {
    error: any;
}

const Error: React.FC<ErrorProps> = ({error}) => {
    return <Result
        status="error"
        title="Нет доступа!"
        subTitle={error.message}
    />;
};

export default Error;