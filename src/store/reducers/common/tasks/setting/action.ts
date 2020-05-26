import {SETTING_CHANGE, SettingChangeTypes} from "./types";

export const settingChange: SettingChangeTypes = (action) =>
    (dispatch) => dispatch({type: SETTING_CHANGE, payload: action});