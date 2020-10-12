import React from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Card, Button} from "lib/ui";
import DeleteGroupButton from "./delete-button/DeleteGroupButton";
import EditorButton from "../../tab-top-extra/editor-button/EditorButton";
import {momentFormatCheckYear} from "../../../../../../../../utils/momentFormatCheckYear";
import {Group} from "../../../../../../../../lib/types/teacher/Group";

interface CardGroupProps {
    group: Group;
}

const CardGroup: React.FC<CardGroupProps> = ({group}) => {
    return <Card>
        <Card.Header title="Группа" icons>
            <EditorButton title="Редактировать группу" group={group}>
                <EditOutlined/>
            </EditorButton>
            <DeleteGroupButton group={group}/>
        </Card.Header>
        <Card.Title title={group.title}/>
        <Card.List list={[
            {title: 'Кол-во учеников', item: group.students_count},
            {
                title: 'Последняя активность',
                item: group.last_homework ? momentFormatCheckYear(group.last_homework.created_at) : 'Неизвестно'
            },
        ]}/>
        <Button type="primary" to={`groups/${group.id}`} size="large" block>
            Подробнее
        </Button>
    </Card>;
};

export default CardGroup;