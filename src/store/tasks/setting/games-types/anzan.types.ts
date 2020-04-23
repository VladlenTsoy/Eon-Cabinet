import {ExtraTypes, SoundTypes} from "../types";
import {State} from "../../../rootTypes";

export interface SettingAnzanProps {
    anzan: 'basic' | 'turbo' | 'list' | 'double'
    mode: 'plus' | 'minus' | 'plus-minus' | 'multiply' | 'divide'
    length: string;
    type: string;
    theme?: string;
    count?: number;
    times: number;
    time: number;
    sound: SoundTypes;
    extra: ExtraTypes;
}

export type SelectAnzanTypes = (state: State) => SettingAnzanProps;
