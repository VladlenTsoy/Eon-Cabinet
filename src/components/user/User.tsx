import React from 'react';
import {useSelector} from "react-redux";
import {Loader} from "lib";

const BlockedAccount = React.lazy(() => import("./blocked-account/BlockedAccount"));
const Student = React.lazy(() => import("./student/Student"));
const Teacher = React.lazy(() => import("./teacher/Teacher"));
const Admin = React.lazy(() => import("./admin/Admin"));
const DirectorCenter = React.lazy(() => import("./director-center/DirectorCenter"));
const DirectorFranchise = React.lazy(() => import("./director-franchise/DirectorFranchise"));

const User = () => {
    const {user} = useSelector((state: any) => state);
    return <>
        <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
            {user.access === 'teacher' ? <Teacher/> :
                user.access === 'director-center' ? <DirectorCenter/> :
                    user.access === 'director-franchise' ? <DirectorFranchise/> :
                        user.access === 'admin' ? <Admin/> :
                            user.access === 'student' ? <Student/> :
                                <BlockedAccount/>}
        </React.Suspense>
        {/*{user.email_verified_at ? null : <ConfirmEmail/>}*/}
    </>;
};

export default User;