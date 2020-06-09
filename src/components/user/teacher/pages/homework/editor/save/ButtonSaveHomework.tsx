import React, {useCallback, useState} from 'react';
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import ModalEditor from "../../../../../../../layouts/modal-editor/ModalEditor";
import FormItems from "./form-items/FormItems";
import {groupSelector} from "../../../../../../../store/reducers/teacher/group/groupSlice";

interface ButtonSaveHomeworkProps {
    homework?: any;
    exercises: any;
    disciplineId: any;
}

const ButtonSaveHomework: React.FC<ButtonSaveHomeworkProps & RouteComponentProps> = ({homework, exercises, disciplineId}) => {
    const {group, isSaved} = useSelector(groupSelector);
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const fetch = useCallback(() => {
        history.push(isSaved ? `/groups/${group?.id}` : '/homework');
    }, [history, isSaved, group]);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <Button type="primary" icon={<ArrowRightOutlined/>} onClick={open} block>Далее</Button>
        <ModalEditor
            width={550}
            title={isSaved ? `Сохранить для ${group?.title}` : "Сохранить"}
            visible={visible}
            onCancel={close}
        >
            <FormItems
                homework={homework}
                exercises={exercises}
                disciplineId={disciplineId}
                fetch={fetch}
                close={close}
            />
        </ModalEditor>
    </>
};

export default withRouter(ButtonSaveHomework);