import React, {useEffect, useState} from 'react';
import {Loader} from "lib/components";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/common/user/userSlice";

const BlockedAccount = React.lazy(() => import("./blocked-account/BlockedAccount"));
const Student = React.lazy(() => import("./student/Student"));
const TeacherProvider = React.lazy(() => import("./teacher/TeacherProvider"));
const Admin = React.lazy(() => import("./admin/Admin"));
const DirectorFranchise = React.lazy(() => import("./director-franchise/DirectorFranchise"));

const User: React.FC = () => {
    const user = useSelector(userSelector);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const darkHref: any = document.getElementById("app-theme-dark");
        const themeElement: any = document.getElementById('theme-style');

        if (isDarkTheme && !themeElement) {
            let themeElement = document.createElement('link');
            themeElement.href = darkHref.href;
            themeElement.rel = 'stylesheet';
            themeElement.id = 'theme-style';
            document.body.append(themeElement);
        } else if (themeElement)
            themeElement.remove();

        document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "default");

        return () => {
            let themeElement: any = document.getElementById('theme-style');
            if (themeElement)
                themeElement.remove();
            document.body.setAttribute("data-theme", "default");
        }
    }, [isDarkTheme]);

    useEffect(() => {
        setIsDarkTheme(!!user.detail?.setting?.is_dark);
    }, [user.detail]);

    return <>
        <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
            {user.detail?.access === 'teacher' ? <TeacherProvider/> :
                user.detail?.access === 'director-franchise' ? <DirectorFranchise/> :
                    user.detail?.access === 'admin' ? <Admin/> :
                        user.detail?.access === 'student' ? <Student/> :
                            <BlockedAccount/>
            }
        </React.Suspense>
        {/*{user.email_verified_at ? null : <ConfirmEmail/>}*/}
    </>;
};

export default User;