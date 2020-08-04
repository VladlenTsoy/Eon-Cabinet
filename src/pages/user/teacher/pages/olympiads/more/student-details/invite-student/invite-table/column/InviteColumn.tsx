import React, {useState} from 'react';
import Avatar from "../../../../../../../../../../lib/components/avatar/Avatar";
import { CheckOutlined, UserAddOutlined } from '@ant-design/icons';
import {Button} from "antd";
import {useAppContext} from "store/context/use-app-context";

interface InviteColumnProps {
    student: any;
    fetch: any;
    selected: any;
    setSelected: any;
    olympiad: any;
}

const InviteColumn: React.FC<InviteColumnProps> = ({student, fetch, selected, setSelected, olympiad}) => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(false);

    const addToSelected = async (id: any) => {
        setLoading(true);
        await api.user.post(`/teacher/olympiad/${student.id}/invitation/student/${olympiad.id}`);
        setSelected([...selected, id]);
        fetch();
        setLoading(false);
    };

    return <>
        <tr>
            <td className="avatar-wrapper">
                <Avatar src={student.image} alt={student.first_name}/>
            </td>
            <td className="full-name-wrapper">
                <h4>{student.first_name} {student.last_name}</h4>
                <p>ID: <span>{student.id}</span></p>
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
                {selected.includes(student.id) || student.is_invited ?
                    <Button
                        type="primary"
                        disabled
                        icon={<CheckOutlined />}
                    >
                        Приглашен
                    </Button> :
                    <Button
                        loading={loading}
                        icon={<UserAddOutlined />}
                        onClick={() => addToSelected(student.id)}>
                        Пригласить
                    </Button>}
            </td>
        </tr>
    </>;
};

export default InviteColumn;