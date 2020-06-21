import React from 'react';
import {Empty, Tabs} from "antd";
import {ButtonLink, DescriptionTitle, LoadingBlock} from "lib";
import {PlusOutlined} from "@ant-design/icons";
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";

const {TabPane} = Tabs;

interface DisciplineProps {
}

const Discipline: React.FC<DisciplineProps> = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const [loading, tabs] = useApiUserGeneral({url: `/teacher/olympiad/tabs/${1}`, initValue: []});

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

    return <Tabs defaultActiveKey={'current'} tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}}>
        {tabs.map((tab: any) =>
            <TabPane tab={tab.name} key={tab.key}>
            </TabPane>
        )}
    </Tabs>;
};

export default Discipline;