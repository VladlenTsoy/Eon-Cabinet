import React from 'react';
import ModeOutput from "./ModeOutput";
import {useSelector} from "react-redux";

const OutputBlock: React.FC = () => {
    const {game, user} = useSelector((state: any) => state);
    const {setting, output} = game;
    const state = ['На старт', 'Внимание', 'Марш', null].includes(output) ? 'preparation' : 'execution';

    return <ModeOutput output={output} setting={setting} state={state} color={user.setting.anzanColor}/>;
};

export default OutputBlock;