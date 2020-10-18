import React from 'react';
import Avatar from "../../../../../../../../../../lib/ui/data-display/avatar/Avatar";
import {Button, Modal} from "antd";

interface RequestColumnProps {
    student: any;
    fetch: (params?: any) => void;
    setIsChange: (isChange: boolean) => void;
}

// TODO - api
const RequestColumn: React.FC<RequestColumnProps> = ({student, fetch, setIsChange}) => {

    const acceptRequestStudent = async () => {
        Modal.confirm({
            title: `Добавить (${student.first_name} ${student.last_name}) к участникам олимпиады?`,
            async onOk() {
                // await api.user.patch(
                //     `teacher/olympiad/request/${student.request_id}`,
                //     {status: 'confirmed'}
                // );
                // notification.success({message: `${student.first_name} ${student.last_name} добавлен к участникам олимпиады!`});
                await fetch();
                setIsChange(true);
            }
        });
    };

    const deniedRequestStudent = async () => {
        Modal.confirm({
            title: `Отказать в участии ученику (${student.first_name} ${student.last_name})?`,
            okType: 'danger',
            async onOk() {
                // await api.user.patch(
                //     `teacher/olympiad/request/${student.request_id}`,
                //     {status: 'denied'}
                // );
                // notification.error({message: `Ученику (${student.first_name} ${student.last_name}) отказано!`});
                await fetch();
                setIsChange(true);
            }
        });
    };

    return <>
        <tr>
            <td className="avatar-wrapper">
                <Avatar src={student.image} alt={student.first_name}/>
            </td>
            <td className="full-name-wrapper">
                <h4>{student.first_name} {student.last_name}</h4>
                <p>ID: <span>{student.student_id}</span></p>
            </td>
            <td>
                {student.login}
            </td>
            <td>
                {student.group}
            </td>
            <td className="center-wrapper">
                <span className="center">{student.center}</span>
                <span className="franchise">{student.franchise}</span>
            </td>
            <td>
                <Button.Group>
                    <Button onClick={acceptRequestStudent}>Принять</Button>
                    <Button danger onClick={deniedRequestStudent}>Отказать</Button>
                </Button.Group>
            </td>
        </tr>
    </>;
};

export default RequestColumn;