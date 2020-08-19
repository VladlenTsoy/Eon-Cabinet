import React, {useEffect} from 'react';
import {Alert} from "../../../../../../lib/ui";
import {useSelector} from "react-redux";
import {notificationSelector} from "../../../../../../store/access/teacher/notification/notificationSlice";
import {fetchAlertNotice} from "../../../../../../store/access/teacher/notification/alert-notice/fetchAlertNotice";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";

const Notification: React.FC = () => {
    const {alertNotice} = useSelector(notificationSelector)
    const dispatch = useTeacherDispatch()

    useEffect(() => {
        const promise = dispatch(fetchAlertNotice())
        return () => {
            promise.abort()
        }
    }, [dispatch]);

    return <>
        {
            !alertNotice.loading && alertNotice.data &&
            <Alert
                className="animated bounceInDown"
                type={alertNotice.data.type}
                showIcon
                message={alertNotice.data.title}
                description={alertNotice.data.description}
            />
        }
    </>;
};

export default React.memo(Notification);