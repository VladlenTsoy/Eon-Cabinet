import React from 'react';
import {Card} from "../../../../lib";
import {Alert} from "../../../../layouts/components";

const Platform = () => {
    return  <Card>
        <Alert
            type="info"
            showIcon
            message="Данное обновление является бета-версией!"
            description="Бета-версия будет обновляться ежедневно до завершения бета-периода и не исключены ошибки при работе с сайтом, при неисправности просим Вас уведомлять нас в чате (нижнем в правом углу)."
        />
    </Card>;
};

export default Platform;