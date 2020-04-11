import React from 'react';
import ConfigSounds from "./ConfigSounds";
import ConfigMods from "./ConfigMods";
import styled from "styled-components";

export interface ConfigModsProps {
    plus?: boolean;
    group?: boolean;
    comma?: boolean;
    abacus?: boolean;
    mirror?: boolean;
}

export interface ConfigSoundProps {
    language?: boolean;
}

interface ConfigProps {
    form: any;
    mods?: ConfigModsProps | false;
    sounds?: ConfigSoundProps | false;
}

const ConfigWrapper = styled.div`
  padding-top: 1rem;
`;

const ConfigBlock: React.FC<ConfigProps> = ({form, mods, sounds}) => {
    return <ConfigWrapper>
        {mods ? <ConfigMods form={form} config={mods}/> : null}
        {sounds ? <ConfigSounds form={form} config={sounds}/> : null}
    </ConfigWrapper>;
};

export default ConfigBlock;