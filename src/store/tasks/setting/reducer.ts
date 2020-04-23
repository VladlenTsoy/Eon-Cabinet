import {SETTING_CHANGE, SettingReducerTypes} from "./types";
import {SelectAnzanTypes} from "./games-types/anzan.types";

export const settingAnzan: SelectAnzanTypes = (state) => state.gameSetting;

export const gameSettingReducer: SettingReducerTypes = (
    state, action
) => {
    if (action.type === SETTING_CHANGE) {
        return {
            ...state,
            ...action.payload
        };
    }
};