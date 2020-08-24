import React from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Card, ButtonLink} from "lib/ui";
import DeleteGroupButton from "./delete-button/DeleteGroupButton";
import EditorButton from "../../nav-buttons/editor-button/EditorButton";
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
        <ButtonLink to={`groups/${group.id}`} type="primary" size="large" block>
            Подробнее
        </ButtonLink>
    </Card>;
};

export default CardGroup;