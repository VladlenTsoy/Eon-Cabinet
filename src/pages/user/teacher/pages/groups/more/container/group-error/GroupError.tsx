import React from 'react';
import {Result} from "antd";
import {Card} from "../../../../../../../../lib/ui";

interface GroupErrorProps {
    error: {
        message: string;
    }
}

const GroupError: React.FC<GroupErrorProps> = ({error}) => {
    return <Card>
        <Result
            status="error"
            title="Нет доступа!"
            subTitle={error.message || 'Нет доступа к данной группе!'}
        />
    </Card>;
};

export default GroupError;