import React from 'react';
import {Button, Result} from "antd";

interface SuccessfulResultProps {
    close: any;
}

const SuccessfulResult: React.FC<SuccessfulResultProps> = ({close}) => {
    return <Result
        status="success"
        title="Почта успешно подтверждена!"
        extra={[
            <Button type="primary" key="console" onClick={close}>
                Готово
            </Button>,
        ]}
    />;
};

export default SuccessfulResult;