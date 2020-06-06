import React from 'react';
import {StatsActionProps} from "store/reducers/common/game/gameSplice";
import {SettingAnzanProps} from "../../../../../../store/reducers/common/game/setting/games-types/anzan.types";
import ApplicationFetch from './application-fetch/ApplicationFetch';
import {useSelector} from "react-redux";
import ApplicationTotals from "./application-totals/ApplicationTotals";
import ApplicationOutput from "./application-output/ApplicationOutput";
import {isEqual} from "lodash";
import {TeacherState} from "../../../../../../store/reducers/teacher/store";
import ApplicationRepeat from "./application-repeat/ApplicationRepeat";

export type picturesFunction = (exercises: any) => any[];

export interface CarouselSettingProps {
    topNumbering?: boolean;
    item: React.FC<any>
}

interface ApplicationProps {
    setting?: SettingAnzanProps;
    displayType: SettingAnzanProps['anzan'] | 'carousel' | 'custom';
    timer?: boolean;
    updateResultsTotals?: (answers: any[]) => any;
    listSetting?: any
    carouselSetting?: CarouselSettingProps
    nextStatus?: any;
    CustomDisplay?: React.FC<any>;

    pictures?: string[] | 'abacus' | picturesFunction;
    requestSetting?: { url: string, method?: 'post' | 'get', setting?: any };
    updateAnswersTotals?: any;
    createOutputs?: (totals: any, currentTimes: number) => any;
    updateStats?: () => StatsActionProps;
}

const ApplicationLayout: React.FC<ApplicationProps> = (
    {
        createOutputs,
        pictures,
        requestSetting,
        updateAnswersTotals,
        updateStats,
        //
        timer,
        listSetting,
        updateResultsTotals,
        carouselSetting,
        CustomDisplay,
        nextStatus,
        displayType,
    }
) => {
    const executionMode = useSelector((state: TeacherState) => state.game.executionMode);
    // console.log('layout')

    const output = <ApplicationOutput
        listSetting={listSetting} updateResultsTotals={updateResultsTotals}
        timer={timer} nextStatus={nextStatus} displayType={displayType}
        carouselSetting={carouselSetting} CustomDisplay={CustomDisplay}
    />;

    if (requestSetting && executionMode === 'fetch')
        return <ApplicationFetch
            requestSetting={requestSetting}
            createOutputs={createOutputs}
            createTotals={updateAnswersTotals}
            pictures={pictures}
            updateStats={updateStats}
        >
            {output}
        </ApplicationFetch>

    if (updateAnswersTotals && !requestSetting && executionMode === 'fetch')
        return <ApplicationTotals
            createOutputs={createOutputs}
            pictures={pictures}
            createTotals={updateAnswersTotals}
            updateStats={updateStats}
        >
            {output}
        </ApplicationTotals>;

    return <ApplicationRepeat
        createOutputs={createOutputs}
        pictures={pictures}
        updateStats={updateStats}
    >
        {output}
    </ApplicationRepeat>;
};

const areEqual = (prevProps: any, nextProps: any) => {
    return isEqual(prevProps, nextProps);
};

export default React.memo(ApplicationLayout, areEqual);