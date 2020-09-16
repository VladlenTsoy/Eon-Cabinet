import React from 'react';
import {Loader} from "lib/ui";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/common/user/userSlice";

const BlockedAccount = React.lazy(() => import("./blocked-account/BlockedAccount"));
const Student = React.lazy(() => import("./student/index"));
const Teacher = React.lazy(() => import("./teacher/index"));

const Index: React.FC = () => {
    const user = useSelector(userSelector);

    return <>
        <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
            {
                user.detail?.access === 'teacher' ? <Teacher/> :
                    user.detail?.access === 'student' ? <Student/> :
                        <BlockedAccount/>
            }
        </React.Suspense>
        {/*{user.email_verified_at && <ConfirmEmail/>}*/}
    </>;
};

export default Index;