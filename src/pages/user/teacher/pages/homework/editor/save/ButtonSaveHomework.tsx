import React, {useCallback, useState} from 'react';
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Modal} from "lib/ui";
import FormItems from "./form-items/FormItems";
import {groupSelector} from "../../../../../../../store/access/teacher/group/groupSlice";
import {ParamsProps} from "../../../groups/more/Group";
import {useSelectGroupById} from "../../../../../../../store/access/teacher/group/groupSelectors";

interface ButtonSaveHomeworkProps {
    homework?: any;
    exercises: any;
}

const ButtonSaveHomework: React.FC<ButtonSaveHomeworkProps> = ({homework, exercises}) => {
    // TODO - note group id params
    const {id} = useParams<ParamsProps>();
    const group = useSelectGroupById(Number(id));
    const {isSaved} = useSelector(groupSelector);
    const history = useHistory();
    const [visible, setVisible] = useState(false);

    const fetch = useCallback(() => {
        history.push(isSaved ? `/groups/${group?.id}` : '/homework');
    }, [history, isSaved, group]);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <Button type="primary" icon={<ArrowRightOutlined/>} onClick={open} block>Далее</Button>
        <Modal
            width={550}
            title={isSaved ? `Сохранить для ${group?.title}` : "Сохранить"}
            visible={visible}
            onCancel={close}
        >
            <FormItems
                homework={homework}
                exercises={exercises}
                fetch={fetch}
                close={close}
            />
        </Modal>
    </>
};

export default React.memo(ButtonSaveHomework);