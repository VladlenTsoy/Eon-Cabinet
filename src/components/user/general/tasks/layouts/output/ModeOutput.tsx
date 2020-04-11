import React from 'react';
import AbacusOutput from "./ModeOutput/AbacusOutput";
import TurboOutput from "./ModeOutput/TurboOutput";
import BasicOutput from "./ModeOutput/BasicOutput";
import DoubleOutput from "./ModeOutput/DoubleOutput";

interface ModeOutputProps {
    setting: any;
    output: any;
    state: string;
    color: string;
}

const ModeOutput: React.FC<ModeOutputProps> = ({setting, output, state, color}) => {
    const numberWithPlus = (x: number) => Math.sign(x) !== -1 ? '+' + x : x;
    const numberWithCommas = (x: any) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (setting.extra && state === 'execution') {

        if (setting.extra.includes('plus'))
            output = numberWithPlus(output);
        if (setting.extra.includes('comma'))
            output = numberWithCommas(output);

        if (setting.anzan === 'turbo')
            return <TurboOutput output={output} setting={setting}/>;

        if (setting.anzan === 'double')
            return <DoubleOutput>
                {setting.extra.includes('abacus') ?
                    <>
                        <AbacusOutput setting={setting} output={output[0]} double/>
                        <AbacusOutput setting={setting} output={output[1]} double/>
                    </> :
                    <>
                        <BasicOutput output={output[0]} state={state} setting={setting} color={color}/>
                        <BasicOutput output={output[1]} state={state} setting={setting} color={color}/>
                    </>
                }
            </DoubleOutput>;

        if (setting.extra.includes('abacus'))
            return <AbacusOutput setting={setting} output={output}/>;
    }
    return <BasicOutput output={output} state={state} setting={setting} color={color}/>;
};

export default ModeOutput;