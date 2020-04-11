import React, {useCallback, useState} from 'react';
import TableStudents from "./table-students/TableStudents";
import {Card} from "lib";
import {Result} from "antd";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";
import {useChangeTitle} from "../../../../../effects/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../effects/use-change-action-navbar.effect";
import GroupNavigation from "./navigation/GroupNavigation";
import {useDispatch, useSelector} from "react-redux";
import {appChangeDataForSending} from "../../../../../store/app/actions";

interface GroupProps {
    match: any;
}

const Group: React.FC<GroupProps> = ({match}) => {
    const {app} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const isSaved = match.params.id === app.dataForSending.groupId && app.dataForSending.isSaved;
    const [selectUsersId, setSelectUsersId] = useState<number[]>(isSaved ? app.dataForSending.studentsId : []);
    const [loadingGroup, group, errorGroup] = useApiUserGeneral({url: `/teacher/group/${match.params.id}`});
    const [loadingUsers, users, errorUsers, fetchUsers] = useApiUserGeneral({url: `/teacher/students/${match.params.id}`});

    useChangeActionNavbar({action: 'back'});
    useChangeTitle({title: loadingGroup ? 'Группа: Загрузка...' : `Группа: ${group ? group.title : 'Недоступна'}`});

    const selectUsers = useCallback((ids: any) => {
        setSelectUsersId(ids);
        dispatch(appChangeDataForSending({
            groupId: match.params.id,
            studentsId: ids,
        }));
    }, [dispatch, match]);

    if (errorGroup || errorUsers)
        return <Card>
            <Result
                status="error"
                title="Нет доступа!"
                subTitle={
                    errorGroup ?
                        errorGroup.message : errorUsers ?
                        errorUsers.message : 'Нет доступа к данной группе!'
                }
            />
        </Card>;

    return <>
        <GroupNavigation
            isVisible={isSaved}
            fetchUsers={fetchUsers}
            groupId={match.params.id}
            selectUsersId={selectUsersId}
        />
        <TableStudents
            users={users}
            selectUsersId={selectUsersId}
            loading={loadingUsers}
            fetchUsers={fetchUsers}
            selectUsers={selectUsers}
        />
    </>;
};

export default Group;