import {Dispatch} from "redux";

export const APP_CHANGE_TITLE = "APP_CHANGE_TITLE";
export const APP_CHANGE_ACTION = "APP_CHANGE_ACTION";
export const APP_CHANGE_LOADING = "APP_CHANGE_LOADING";
export const APP_CHANGE_SPIN = "APP_CHANGE_SPIN";
export const APP_CHANGE_SETTING = "APP_CHANGE_SETTING";
export const APP_CHANGE_ALGORITHMS = "APP_CHANGE_ALGORITHMS";
export const APP_CHANGE_DISCIPLINES = "APP_CHANGE_DISCIPLINES";
export const APP_CHANGE_CATEGORIES = "APP_CHANGE_CATEGORIES";
export const APP_CHANGE_ACTIVE_DISCIPLINE_ID = "APP_CHANGE_ACTIVE_DISCIPLINE_ID";
export const APP_CHANGE_DATA_FOR_SENDING = "APP_CHANGE_DATA_FOR_SENDING";

export const appChangeTitleNavbar = (title: string) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_TITLE, payload: title});


export const appChangeActionNavbar = (action: string | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_ACTION, payload: action});

// export const appChangeLoading = (action: boolean) =>
//     (dispatch: Dispatch) =>
//         dispatch({type: APP_CHANGE_LOADING, payload: action});

export const appChangeSpin = (action: boolean) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_SPIN, payload: action});

export const appChangeSetting = (action: object | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_SETTING, payload: action});


export const appChangeAlgorithms = (action: any) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_ALGORITHMS, payload: action.algorithm});

export const appChangeDisciplines = (action: object | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_DISCIPLINES, payload: action});

export const appChangeCategories = (action: object | null) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_CATEGORIES, payload: action});

export const appChangeActiveDisciplineId = (action: string | undefined) =>
    (dispatch: Dispatch) =>
        dispatch({type: APP_CHANGE_ACTIVE_DISCIPLINE_ID, payload: action});


interface ActionForSendingProps {
    studentsId?: any[],
    group?: any,
    isSaved?: boolean,
}

export const appChangeDataForSending = (action: ActionForSendingProps) =>
    (dispatch: Dispatch, getState: any) =>
        dispatch({type: APP_CHANGE_DATA_FOR_SENDING, payload: {...getState().app.dataForSending, ...action}});

/**
 * Основные настройки
 *
 * @param action
 */
export const appChangeBasicSettings = (action: any) =>
    async (dispatch: Dispatch) => {
        await dispatch({type: APP_CHANGE_DISCIPLINES, payload: action['disciplines']});
        await dispatch({type: APP_CHANGE_CATEGORIES, payload: action['categories']});
        await dispatch({type: APP_CHANGE_ALGORITHMS, payload: action['algorithms']});
    };
