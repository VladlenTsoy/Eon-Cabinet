import React, {useCallback, useState} from 'react';
import {useSelector} from "react-redux";
// import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
// import {LoadingBlock} from "lib";
// import OtherApplication from "./other/OtherApplication";
// import ListApplication from "./list/ListApplication";
// import IconAbacus from 'assets/images/tasks/abacus.svg';
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";

const Application: React.FC = () => {
    const setting = useSelector(settingAnzan);
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    const addAnswerToTotals = useCallback((exercises) => {
        // Count the answer
        if (isMultiplication)
            return setting.mode === 'multiply' ? exercises[0] * exercises[1] : exercises[0] / exercises[1];
        else
            return exercises.reduce((total: any, val: any) => total + val);
    }, [isMultiplication, setting]);

    const addOutputToTotals = useCallback((exercise) => {
        if (isMultiplication)
            return exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercise[1];
        return exercise;
    }, [isMultiplication, setting]);

    const updateTotals = useCallback((data, totals, currentTimes) => {
        totals[currentTimes] = {
            exercises: data,
            output: addOutputToTotals(data),
            answer: addAnswerToTotals(data),
        };
    }, [isMultiplication, addAnswerToTotals]);

    const updateStats = useCallback(() => {
        return {all: setting.times};
    }, []);

    return <ApplicationLayout
        setting={setting}
        updateTotals={updateTotals}
        updateStats={updateStats}
        displayType={setting.anzan}
        urlExercises={setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm'}
        sounds="basic"
        pictures="abacus"
        nextStatus={setting.extra.includes('group') ? "intermediate" : "answer"}
        time={setting.time}
    />
};

// const Application: React.FC = () => {
//     const {setting, executionMode} = useSelector(gameAnzan);
//
//     // Если умножение
//     const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');
//
//     const [loading, data] = useApiUserGeneral({
//         url: setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm',
//         config: {params: setting},
//         afterRequest: async () => {
//             if (setting.extra && setting.extra.includes('abacus')) {
//                 return new Promise((resolve => {
//                     const iconAbacus = new Image();
//                     iconAbacus.onload = () => resolve(true);
//                     iconAbacus.src = IconAbacus;
//                 }));
//             }
//         },
//         cancel: executionMode === 'repeat'
//     });
//
//     /**
//      * Вывод мода упражнения
//      *
//      * @param anzan
//      */
//     const outputApplication = (anzan: string): any => {
//         switch (anzan) {
//             case 'list':
//                 return <ListApplication
//                     numbers={data}
//                     isMultiplication={isMultiplication}
//                 />;
//             case 'basic':
//             case 'turbo':
//             case 'double':
//                 return <OtherApplication
//                     numbers={data}
//                     isMultiplication={isMultiplication}
//                 />;
//         }
//     };
//
//     return loading ?
//         <LoadingBlock title="Загрузка чисел..."/> :
//         outputApplication(setting.anzan);
// };

export default Application;