import React from 'react';
import { RedoOutlined } from '@ant-design/icons';
import {Button, Empty} from "antd";
import {LoadingBlock} from "lib/components";
import RequestColumn from "./column/RequestColumn";
import {ScrollWrapper, TableWrapper} from "../../invite-student/invite-table/InviteTable";
import {useApiUserGeneral} from "../../../../../../../../../hooks/use-api-user-general.effect";
import {DescriptionTitle, Spin} from "../../../../../../../../../lib/components";
import {useLanguage} from "../../../../../../../../../hooks/use-language";

interface RequestTableProps {
    olympiad: any;
    setIsChange: (isChange: boolean) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({olympiad, setIsChange}) => {
    const {language} = useLanguage();
    const [loading, students, , fetch] = useApiUserGeneral({
        url: `teacher/olympiad/${olympiad.id}/requests/students`,
        initValue: []
    });

    if (loading && !students.length)
        return <LoadingBlock/>;

    if (!students.length)
        return (
            <Empty
                description={
                    <>
                        <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                        <span>Нет запросов от учеников.</span>
                    </>
                }
            >
                <Button icon={<RedoOutlined />} onClick={() => fetch()} size="large">Обновить</Button>
            </Empty>
        );

    return <Spin tip="Загрузка..." spinning={loading}>
        <ScrollWrapper>
            <TableWrapper>
                <thead>
                <tr>
                    <th/>
                    <th>Имя</th>
                    <th>Логин</th>
                    <th>Группа</th>
                    <th>Центр</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map((student: any, key: number) =>
                        <RequestColumn student={student} fetch={fetch} setIsChange={setIsChange} key={key}/>
                    )
                }
                </tbody>
            </TableWrapper>
        </ScrollWrapper>
    </Spin>;
};

export default RequestTable;