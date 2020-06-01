import {ExtraTypes, SoundTypes} from "../types";

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

export interface SettingCustomExercisesBasicProps {
    type_task: 'basic';
    anzan: 'basic' | 'turbo' | 'double';
    mode: 'plus' | 'minus' | 'plus-minus' | 'multiply' | 'divide';
    custom_exercises_id: number;
    length: string;
    type: string;
    theme?: string;
    count?: number;
    times: number;
    time: number;
    sound: SoundTypes;
    extra: ExtraTypes;
}

export interface SettingCustomExercisesListProps {
    type_task: 'list';
    anzan: 'list';
    custom_exercises_id: number;
    mode: 'plus' | 'minus' | 'plus-minus' | 'multiply' | 'divide';
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

export type SettingAnzanProps =
    (SettingAnzanBasicProps
    | SettingAnzanListProps)
    | (SettingCustomExercisesBasicProps
    | SettingCustomExercisesListProps);
