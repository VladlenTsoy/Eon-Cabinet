import React from 'react';
import {useApiUserGeneral} from "../../../../../../hooks/use-api-user-general.effect";
import {Alert} from "../../../../../../lib/components";

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