import React from 'react';
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import IconAbacus from "../../../../../../assets/images/tasks/abacus.svg";
import {useSelector} from "react-redux";
import {game} from "../../../../../../store/game/reducer";

interface ApplicationProps {
    setting: any;
    displayType: 'basic' | 'list' | 'carousel' | React.ReactNode;
    sounds?: string[] | 'basic';
    pictures?: string[] | 'abacus';
    urlExercises: string;
    timer?: number;
}

const ApplicationLayout: React.FC<ApplicationProps> = (
    {
        setting,
        displayType,
        sounds,
        pictures,
        urlExercises,
        timer,
    }
) => {
    const {executionMode} = useSelector(game);

    const [loading, data] = useApiUserGeneral({
        url: urlExercises,
        config: {params: setting},
        afterRequest: async () => {
            if (setting.extra && setting.extra.includes('abacus')) {
                return new Promise((resolve => {
                    const iconAbacus = new Image();
                    iconAbacus.onload = () => resolve(true);
                    iconAbacus.src = IconAbacus;
                }));
            }
        },
        cancel: executionMode === 'repeat'
    });

    return <>

    </>;
};

export default ApplicationLayout;