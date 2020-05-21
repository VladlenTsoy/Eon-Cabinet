import React from 'react';
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import {Alert} from "../../../../../../layouts/components";

const Notification: React.FC = () => {
    const [loading, notification] = useApiUserGeneral({url: 'teacher/notification'});

    return <>
        {!loading && notification ?
            <Alert
                className="animated bounceInDown"
                type={notification.type}
                showIcon
                message={notification.title}
                description={notification.description}
            /> : null}
    </>;
};

export default Notification;