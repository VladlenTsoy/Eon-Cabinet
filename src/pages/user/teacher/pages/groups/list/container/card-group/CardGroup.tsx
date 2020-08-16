import React from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Card, ButtonLink} from "lib/components";
import DeleteGroupButton from "./delete-button/DeleteGroupButton";
import EditorButton from "../../nav-buttons/editor-button/EditorButton";
import {GroupProps} from "store/access/teacher/group/groupSlice";
import {momentFormatCheckYear} from "../../../../../../../../utils/momentFormatCheckYear";

interface CardGroupProps {
    group: GroupProps;
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
            {title: 'Категория', item: group.category.title},
            {title: 'Кол-во учеников', item: group.count},
            {
                title: 'Дата создания',
                item: group.created_at ? momentFormatCheckYear(group.created_at) : 'Неизвестно'
            },
            {
                title: 'Последняя активность',
                item: group.last_activity ? momentFormatCheckYear(group.last_activity) : 'Неизвестно'
            },
        ]}/>
        <ButtonLink to={`groups/${group.id}`} type="primary" block>
            Подробнее
        </ButtonLink>
    </Card>;
};

export default CardGroup;