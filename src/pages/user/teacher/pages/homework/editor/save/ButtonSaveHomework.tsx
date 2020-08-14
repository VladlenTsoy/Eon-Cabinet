import React, {useCallback, useState} from 'react';
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import ModalEditor from "../../../../../../../lib/layouts/modal-editor/ModalEditor";
import FormItems from "./form-items/FormItems";
import {groupSelector} from "../../../../../../../store/access/teacher/group/groupSlice";

interface ButtonSaveHomeworkProps {
    homework?: any;
    exercises: any;
}

const ButtonSaveHomework: React.FC<ButtonSaveHomeworkProps> = ({homework, exercises}) => {
    const {group, isSaved} = useSelector(groupSelector);
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const fetch = useCallback(() => {
        history.push(isSaved ? `/groups/${group.detail?.id}` : '/homework');
    }, [history, isSaved, group]);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <Button type="primary" icon={<ArrowRightOutlined/>} onClick={open} block>Далее</Button>
        <ModalEditor
            width={550}
            title={isSaved ? `Сохранить для ${group.detail?.title}` : "Сохранить"}
            visible={visible}
            onCancel={close}
        >
            <FormItems
                homework={homework}
                exercises={exercises}
                fetch={fetch}
                close={close}
            />
        </ModalEditor>
    </>
};

export default React.memo(ButtonSaveHomework);