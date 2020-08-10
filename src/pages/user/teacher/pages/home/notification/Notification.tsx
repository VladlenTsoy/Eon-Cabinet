import React, {useEffect} from 'react';
import {Alert} from "../../../../../../lib/components";
import {useDispatch, useSelector} from "react-redux";
import {notificationSelector} from "../../../../../../store/access/teacher/notification/notificationSlice";
import {fetchAlertNotice} from "../../../../../../store/access/teacher/notification/alert-notice/fetchAlertNotice";

const Notification: React.FC = () => {
    const {alertNotice} = useSelector(notificationSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAlertNotice())
        return () => {
            promise.abort()
        }
    }, [dispatch]);

    return <>
        {!alertNotice.loading && alertNotice.data ?
            <Alert
                className="animated bounceInDown"
                type={alertNotice.data.type}
                showIcon
                message={alertNotice.data.title}
                description={alertNotice.data.description}
            /> : null}
    </>;
};

export default Notification;