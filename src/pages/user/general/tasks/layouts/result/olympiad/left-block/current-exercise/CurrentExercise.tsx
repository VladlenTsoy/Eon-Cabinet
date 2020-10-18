import React, {useState} from 'react';
import { EyeOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {Button, Drawer, Card} from "lib/ui";

interface CurrentExerciseProps {
    stats: {
        all: number;
        success: number;
    };
}

const CurrentExercise: React.FC<CurrentExerciseProps> = (
    {
        stats,
        children
    }
) => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return (
        <Card className="info">
            <div className="title">Примеры текущего упражнения</div>
            <div className="container">
                <div className="icon">
                    <ThunderboltOutlined />
                </div>
                <div className="content">
                    Выполнено <span className="active">{stats.success}</span> из {stats.all}
                </div>
            </div>
            <Button type="dashed" icon={<EyeOutlined />} block size="large" onClick={open}>Посмотреть ответы</Button>
            <Drawer
                title="Результат"
                visible={visible}
                onClose={close}
                width={'100%'}
            >
                {children}
            </Drawer>
        </Card>
    );
};

export default CurrentExercise;