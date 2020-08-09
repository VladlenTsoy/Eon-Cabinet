import React from 'react';
import {Loader} from "lib/components";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/common/user/userSlice";

const BlockedAccount = React.lazy(() => import("./blocked-account/BlockedAccount"));
const Student = React.lazy(() => import("./student/Student"));
const Teacher = React.lazy(() => import("./teacher/index"));
const Admin = React.lazy(() => import("./admin/Admin"));
const DirectorFranchise = React.lazy(() => import("./director-franchise/DirectorFranchise"));

const User: React.FC = () => {
    const user = useSelector(userSelector);

    return <>
        <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
            {
                user.detail?.access === 'teacher' ? <Teacher/> :
                    user.detail?.access === 'director-franchise' ? <DirectorFranchise/> :
                        user.detail?.access === 'admin' ? <Admin/> :
                            user.detail?.access === 'student' ? <Student/> :
                                <BlockedAccount/>
            }
        </React.Suspense>
        {/*{user.email_verified_at && <ConfirmEmail/>}*/}
    </>;
};

export default User;