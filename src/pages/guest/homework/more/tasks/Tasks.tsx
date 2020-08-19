import React from 'react';
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {DescriptionTitle, LoadingBlock} from "../../../../../lib/ui";
import {Col, Empty, Row} from "antd";
import Task from "./task/Task";
import {useLanguage} from "../../../../../hooks/use-language";

interface TasksProps {
    id: string;
}

const Tasks:React.FC<TasksProps> = ({id}) => {
    const {language} = useLanguage();
    const [loading, tasks] = useApiUserGeneral({url: `guest/homework/${id}/tasks`, initValue: [], access: "guest"});

    // Загрузка
    if (loading) return <LoadingBlock/>;
    // Если пустой
    if (!tasks.length)
        return <Empty
            description={
                <>
                    <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                    <span>Произошла ошибка! В домашнем задание нет упражнений.</span>
                </>
            }
        />;

    return <Row  gutter={15}>
        {tasks.map((item: any, key: number) =>
            <Col xxl={6} xl={8} md={12} sm={24} xs={24} key={key}>
                <Task id={id} task={item}/>
            </Col>
        )}
    </Row>
};

export default Tasks;