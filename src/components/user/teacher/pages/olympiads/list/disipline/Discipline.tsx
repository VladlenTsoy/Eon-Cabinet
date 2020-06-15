import React from 'react';
import {Empty, Tabs} from "antd";
import {ButtonLink, DescriptionTitle, LoadingBlock, TabTitleCustom} from "lib";
import {PlusOutlined} from "@ant-design/icons";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import Olympiads from "./olympiads/Olympiads";

const {TabPane} = Tabs;

interface DisciplineProps {
    disciplineId: any;
}

const Discipline: React.FC<DisciplineProps> = ({disciplineId}) => {
    const [loading, tabs] = useApiUserGeneral({url: `/teacher/olympiad/tabs/${disciplineId}`, initValue: []});

    if (loading)
        return <LoadingBlock/>

    if (!tabs.length)
        return <Empty
            description={
                <>
                    <DescriptionTitle>Пусто</DescriptionTitle>
                    <span>Нет сохраненных олимпиад</span>
                </>
            }
        >
            <ButtonLink type="ghost" size="large" to="/olympiad/create" icon={<PlusOutlined/>}>
                Создать олимпиаду
            </ButtonLink>
        </Empty>;

    return <Tabs defaultActiveKey={'current'}>
        {tabs.map((tab: any) =>
            <TabPane
                tab={
                    <TabTitleCustom>
                        {tab.name}
                    </TabTitleCustom>
                }
                key={tab.key}
            >
                <Olympiads keyFetch={tab.key} disciplineId={disciplineId}/>
            </TabPane>
        )}
    </Tabs>;
};

export default Discipline;