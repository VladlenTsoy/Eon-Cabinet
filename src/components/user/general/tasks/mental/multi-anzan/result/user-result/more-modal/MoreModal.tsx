import React from 'react';
import {useSelector} from "react-redux";
import MoreBasic from "./more-basic/MoreBasic";
import {totalsSelect} from "../../../../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../../../store/tasks/setting/reducer";

interface MoreModalProps {
    taskKey: number;
}

const MoreModal: React.FC<MoreModalProps> = ({taskKey}) => {
    const totals:any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);

    return setting.group ?
        totals.user[taskKey].map((val: any, key: number) =>
            <MoreBasic
                key={taskKey+''+key}
                result={totals.result[taskKey][key]}
                answer={totals.answer[taskKey][key]}
                user={totals.user[taskKey][key]}
                exercise={setting.mode === 'multiplication' ?
                    totals.exercise[taskKey][key][0] + (setting.windows[taskKey].mode === 'multiply' ? ' * ' : ' / ') + totals.exercise[taskKey][key][1]:
                    totals.exercise[taskKey][key].join(', ')
                }
            />
        ) :
        totals.map((total: any, key: number) => {
            return <MoreBasic
                key={key}
                result={total.result[taskKey]}
                answer={total.answer[taskKey]}
                user={total.user[taskKey]}
                exercise={setting.mode === 'multiplication' ?
                    total.exercise[taskKey][0] + (setting.windows[taskKey].mode === 'multiply' ? ' * ' : ' / ') + total.exercise[taskKey][1] :
                    total.exercise[taskKey].join(', ')
                }
            />
        });
};

export default MoreModal;