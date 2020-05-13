import React, {useCallback, useState} from 'react';
import {Card} from "../../../../../lib";
import {Button, Modal} from "antd";
import {Drawer} from "../../../../components";
import {EyeOutlined, ThunderboltOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {game} from "../../../../../store/game/reducer";
import {useRouteMatch} from "react-router";
import {ResultMatchProps} from "../../../../../components/user/general/tasks/layouts/result/homework/Result";

interface CurrentExerciseDrawnBlockProps {
    resultId?: number;
}

const CurrentExerciseDrawnBLock: React.FC<CurrentExerciseDrawnBlockProps> = (
    {
        children,
        resultId
    }
) => {
    const match = useRouteMatch<ResultMatchProps>();

    const {api} = useSelector((state: any) => state);
    const {stats} = useSelector(game);

    const [isView, setIsView] = useState(!match.params.homeworkId);
    const [visible, setVisible] = useState(false);

    const viewResult = useCallback(async () => {
        await api.user_general.post(`/student/homework/result/${resultId}/view`);
        setIsView(true);
        setVisible(true);
    }, [setIsView, api.user_general, resultId]);

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