import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
import {LoadingBlock} from "lib";
import OtherApplication from "./other/OtherApplication";
import ListApplication from "./list/ListApplication";
import IconAbacus from 'assets/images/tasks/abacus.svg';
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";

const Application: React.FC = () => {
    const setting = useSelector(settingAnzan);

    return <ApplicationLayout
        setting={setting}
        displayType={setting.anzan === "list" ? "list" : "basic"}
        urlExercises={setting.anzan === 'list' ? '/algorithm/list' : setting.anzan === 'double' ? '/algorithm/double' : '/algorithm'}
        sounds="basic"
        pictures="abacus"
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