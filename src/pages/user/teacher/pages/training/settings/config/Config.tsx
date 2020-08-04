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
    mods?: ConfigModsProps | false;
    sounds?: ConfigSoundProps | false;
}

const ConfigWrapper = styled.div`
  padding-top: 1rem;
`;

const ConfigBlock: React.FC<ConfigProps> = ({mods, sounds}) => {
    return <ConfigWrapper>
        {mods ? <ConfigMods config={mods}/> : null}
        {sounds ? <ConfigSounds config={sounds}/> : null}
    </ConfigWrapper>;
};

export default React.memo(ConfigBlock);