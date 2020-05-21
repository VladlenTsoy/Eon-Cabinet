import React, {useCallback, useState} from 'react';
import TableStudents from "./table-students/TableStudents";
import {Card} from "lib";
import {Result} from "antd";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import {useChangeTitle} from "../../../../../../effects/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";
import GroupNavigation from "./navigation/GroupNavigation";
import {useDispatch, useSelector} from "react-redux";
import {appChangeDataForSending} from "../../../../../../store/app/actions";
import {useParams} from "react-router-dom";

interface ParamsProps {
    id: string;
}

const Group: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const {app} = useSelector((state: any) => state);
    //
    const {dataForSending} = app;
    const isSaved = dataForSending.isSaved && Number(id) === dataForSending.group.id;

    const dispatch = useDispatch();
    const [selectUsersId, setSelectUsersId] = useState<number[]>(isSaved ? dataForSending.studentsId : []);
    const [loadingGroup, group, errorGroup] = useApiUserGeneral({url: `/teacher/group/${id}`});
    const [loadingUsers, users, errorUsers, fetchUsers] = useApiUserGeneral({url: `/teacher/students/${id}`});

    useChangeActionNavbar({action: '/groups'});
    useChangeTitle({title: loadingGroup ? 'Группа: Загрузка...' : `Группа: ${group ? group.title : 'Недоступна'}`});

    const selectUsers = useCallback((ids: any) => {
        setSelectUsersId(ids);
        dispatch(appChangeDataForSending({
            group: group,
            studentsId: ids,
        }));
    }, [dispatch, group]);

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
            groupId={id}
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