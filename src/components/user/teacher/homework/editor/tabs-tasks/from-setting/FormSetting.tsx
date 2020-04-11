import React from 'react';
import {Empty} from "antd";
import SettingAnzan from "../../../../training/tasks/mental/anzan/Anzan";
import SettingSpecial from "../../../../training/tasks/mental/special-anzan/Special";
import SettingFlash from "../../../../training/tasks/mental/flash-anzan/Flash";
import SettingProgression from "../../../../training/tasks/mental/progression/Progression";
import SettingWordList from "../../../../training/tasks/mnemonics/word-list/WordList";
import SettingDigitalPicture from "../../../../training/tasks/mnemonics/digital-picture/DigitalPicture";
import SettingCountries from "../../../../training/tasks/mnemonics/countries/Countries";
import SettingMasterSystem from "../../../../training/tasks/mnemonics/master-system/MasterSystem";
import SettingPersonalities from "../../../../training/tasks/mnemonics/personalities/Personalities";
import SettingNumbers from "../../../../training/tasks/mnemonics/numbers/Numbers";
import SettingDigitalRow from "../../../../training/tasks/mnemonics/digital-row/DigitalRow";

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