import {ExtraTypes, SoundTypes} from "../types";
import {State} from "../../../rootTypes";

export interface SettingAnzanBasicProps {
    anzan: 'basic' | 'turbo' | 'double'
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

export interface SettingAnzanListProps {
    anzan: 'list'
    mode: 'plus' | 'minus' | 'plus-minus' | 'multiply' | 'divide'
    length: string;
    type: string;
    theme?: string;
    tables: number;
    column: number;
    rows: number;
    time: number;
    sound: SoundTypes;
    extra: ExtraTypes;
}

export type SettingAnzanProps = SettingAnzanBasicProps | SettingAnzanListProps;

export type SelectAnzanTypes = (state: State) => SettingAnzanProps;
