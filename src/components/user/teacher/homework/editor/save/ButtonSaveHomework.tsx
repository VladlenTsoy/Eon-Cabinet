import React, {useCallback, useState} from 'react';
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
import ModalEditor from "../../../../../../layouts/modal-editor/ModalEditor";
import FormItems from "./form-items/FormItems";

interface ButtonSaveHomeworkProps {
    homework?: any;
    exercises: any;
    disciplineId: any;
}

const ButtonSaveHomework: React.FC<ButtonSaveHomeworkProps & RouteComponentProps> = ({homework, exercises, disciplineId}) => {
    const {app} = useSelector((state: any) => state);
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const fetch = useCallback(() => {
        history.push(app.dataForSending.isSaved ? `/groups/${app.dataForSending.group.id}` : '/homework');
    }, [history, app.dataForSending.isSaved, app.dataForSending.group.id]);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <Button type="primary" icon={<ArrowRightOutlined/>} onClick={open} block>Далее</Button>
        <ModalEditor
            width={550}
            title={app.dataForSending.isSaved ? `Сохранить для ${app.dataForSending.group.title}` : "Сохранить"}
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