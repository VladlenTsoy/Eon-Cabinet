import React, {useCallback, useState} from 'react';
import {Card} from "../../../../../lib";
import {Button, Modal} from "antd";
import {Drawer} from "../../../../components";
import {EyeOutlined, ThunderboltOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../store/reducers/common/game/gameSplice";
import {useAppContext} from "../../../../../store/context/use-app-context";

interface CurrentExerciseDrawnBlockProps {
    resultId?: number;
    isView: boolean;
    updateIsView: (state: boolean) => void;
}

const CurrentExerciseDrawnBLock: React.FC<CurrentExerciseDrawnBlockProps> = (
    {
        children,
        resultId,
        isView,
        updateIsView
    }
) => {
    const {api} = useAppContext();
    const {stats} = useSelector(gameSelector);

    const [visible, setVisible] = useState(false);

    const viewResult = useCallback(async () => {
        await api.user.post(`/student/homework/result/${resultId}/view`);
        updateIsView(true);
        setVisible(true);
    }, [updateIsView, api.user, resultId]);

    const open = () => {
        if (resultId && !isView) {
            Modal.confirm({
                icon: <QuestionCircleOutlined/>,
                title: 'Просмотреть ответы?',
                content: 'После просмотра ответов вы не можете повторить упражнение с текущими примерами при следующем выполнении будут сгенерированы новые примеры.',
                onOk: viewResult
            });
        } else
            setVisible(true);
    };
    const close = () => setVisible(false);

    return <Card className="info">
        <div className="title">Примеры текущего упражнения</div>
        <div className="container">
            <div className="icon">
                <ThunderboltOutlined/>
            </div>
            <div className="content">
                Выполнено <span className="active">{stats.success}</span> из {stats.all}
            </div>
        </div>
        <Button type="dashed" icon={<EyeOutlined/>} block size="large"
                onClick={open}>Посмотреть ответы</Button>
        <Drawer
            title="Результат"
            visible={visible}
            placement="left"
            onClose={close}
            width={'100%'}
        >
            {children}
        </Drawer>
    </Card>;
};

export default CurrentExerciseDrawnBLock;