import React from 'react';
import {Empty} from "antd";
import SettingAnzan from "../../../../../training/settings/mental/anzan/Anzan";
import SettingSpecial from "../../../../../training/settings/mental/special-anzan/Special";
import SettingFlash from "../../../../../training/settings/mental/flash-anzan/Flash";
import SettingProgression from "../../../../../training/settings/mental/progression/Progression";
import SettingWordList from "../../../../../training/settings/mnemonics/word-list/WordList";
import SettingDigitalPicture from "../../../../../training/settings/mnemonics/digital-picture/DigitalPicture";
import SettingCountries from "../../../../../training/settings/mnemonics/countries/Countries";
import SettingMasterSystem from "../../../../../training/settings/mnemonics/master-system/MasterSystem";
import SettingPersonalities from "../../../../../training/settings/mnemonics/personalities/Personalities";
import SettingNumbers from "../../../../../training/settings/mnemonics/numbers/Numbers";
import SettingDigitalRow from "../../../../../training/settings/mnemonics/digital-row/DigitalRow";
import SettingCustomExercises from "../../../../../training/settings/mental/custom-exercises/CustomExercises";

interface FormSettingProps {
    sendSubmit: any;
    taskId: number;
}

const FormSetting: React.FC<FormSettingProps> = ({taskId, sendSubmit}) => {
    const outputSetting = () => {
        switch (taskId) {
            case 23:
                return <SettingAnzan
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 6:
                return <SettingFlash
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 17:
                return <SettingSpecial
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 22:
                return <SettingProgression
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 24:
                return <SettingCustomExercises
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;

            //

            case 15:
                return <SettingWordList
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 19:
                return <SettingDigitalPicture
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 9:
                return <SettingCountries
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 11:
                return <SettingMasterSystem
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 8:
                return <SettingPersonalities
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 16:
                return <SettingNumbers
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            case 10:
                return <SettingDigitalRow
                    addSettingHomework={(setting => sendSubmit(taskId, setting))}
                    key={taskId}
                />;
            default:
                return <Empty/>;
        }
    };

    return <>
        {outputSetting()}
    </>
};

export default FormSetting;