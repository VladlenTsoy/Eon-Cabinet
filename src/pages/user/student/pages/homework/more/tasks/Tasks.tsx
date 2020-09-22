import React from "react";
import {Col, Row, Empty} from "antd";
import {LoadingBlock} from "lib/ui";
import {DescriptionTitle} from "../../../../../../../lib/ui";
import Task from "./task/Task";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import {useLanguage} from "../../../../../../../hooks/use-language"

interface Tasks {
    id: number;
}

const TasksMoreHomework: React.FC<Tasks> = ({id}) => {
    const {l} = useLanguage();
    const [loading, tasks] = useApiUserGeneral({url: `student/homework/send/${id}/tasks`, initValue: []});

    // Загрузка
    if (loading) return <LoadingBlock/>;
    // Если пустой
    if (!tasks.length)
        return <Empty
            description={
                <>
                    <DescriptionTitle>{l('empty')}</DescriptionTitle>
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

export default TasksMoreHomework;