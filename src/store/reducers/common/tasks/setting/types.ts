import {Reducer} from "redux";
import {ActionFunctionTypes} from "../../../../rootTypes";
// import {SettingAnzanProps} from "./games-types/anzan.types";

export const SETTING_CHANGE = "SETTING_CHANGE";

export type ExtraTypes = ['plus', 'group', 'comma', 'abacus' | 'mirror'];
export type SoundTypes = 'none' | 'basic' | 'ru' | 'en';

type SettingStateProps = any;

interface SettingActionTypes {
    type: typeof SETTING_CHANGE;
    payload: SettingStateProps;
}

export type SettingChangeTypes = ActionFunctionTypes<SettingStateProps, SettingActionTypes>;

export type SettingReducerTypes = Reducer<SettingStateProps, SettingActionTypes>;