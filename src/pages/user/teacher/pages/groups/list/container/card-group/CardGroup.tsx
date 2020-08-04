import React from 'react';
import {EditOutlined} from '@ant-design/icons';
import {Card, ButtonLink} from "lib/components";
import DeleteGroupButton from "./delete-button/DeleteGroupButton";
import EditorButton from "../../nav-buttons/editor-button/EditorButton";
import moment from "moment";
import {GroupProps} from "store/access/teacher/group/groupSlice";

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
                item: group.created_at ? moment(group.created_at).format('DD/MM/YY') : 'Неизвестно'
            },
            {
                title: 'Последняя активность',
                item: group.last_activity ? moment(group.last_activity).format('DD/MM/YY') : 'Неизвестно'
            },
        ]}/>
        <ButtonLink to={`groups/${group.id}`} type="primary" block>
            Подробнее
        </ButtonLink>
    </Card>;
};

export default CardGroup;