import React from 'react';
import ConfigBlock from "../../../../../config/Config";

interface ConfigItemProps {
    typeTask: string;
    mode: string;
}

const ConfigItem: React.FC<ConfigItemProps> = (
    {
        mode,
        typeTask,
    }
) => {
    return <ConfigBlock
        sounds={
            typeTask === 'basic' && mode === 'plus-minus' ?
                {
                    language: false,
                } : false
        }
        mods={
            mode !== 'plus-minus' ?
                {
                    group: typeTask !== 'list'
                } :
                {
                    plus: true,
                    group: typeTask !== 'list',
                    comma: true,
                    mirror: true,
                    abacus: typeTask !== 'list'
                }
        }
    />;
};

export default React.memo(ConfigItem);