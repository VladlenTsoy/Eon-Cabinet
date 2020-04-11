import {
    APP_CHANGE_ACTION,
    APP_CHANGE_ALGORITHMS,
    APP_CHANGE_LOADING,
    APP_CHANGE_SETTING,
    APP_CHANGE_TITLE,
    APP_CHANGE_DISCIPLINES,
    APP_CHANGE_CATEGORIES,
    APP_CHANGE_SPIN,
    APP_CHANGE_ACTIVE_DISCIPLINE_ID,
    APP_CHANGE_DATA_FOR_SENDING,
    APP_CHANGE_CUSTOM_ALGORITHMS,
} from "./actions";

export const appReducer = (state = {
    title: 'Моя страница',
    action: null,
    loading: true,
    spin: false,
    activeDisciplineId: undefined,
    setting: null,
    algorithms: null,
    disciplines: null,
    categories: null,
    dataForSending: {
        studentsId: [],
        groupId: null,
        isSaved: false,
    },
}, action: any) => {
    switch (action.type) {
        case APP_CHANGE_TITLE:
            return {
                ...state,
                title: action.payload
            };
        case APP_CHANGE_ACTION:
            return {
                ...state,
                action: action.payload
            };
        case APP_CHANGE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case APP_CHANGE_SPIN:
            return {
                ...state,
                spin: action.payload
            };
        case APP_CHANGE_SETTING:
            return {
                ...state,
                setting: action.payload
            };
        case APP_CHANGE_ALGORITHMS:
            return {
                ...state,
                algorithms: action.payload
            };
        case APP_CHANGE_CUSTOM_ALGORITHMS:
            return {
                ...state,
                custom_algorithms: action.payload
            };
        case APP_CHANGE_DISCIPLINES:
            return {
                ...state,
                disciplines: action.payload
            };
        case APP_CHANGE_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case APP_CHANGE_ACTIVE_DISCIPLINE_ID:
            return {
                ...state,
                activeDisciplineId: action.payload
            };
        case APP_CHANGE_DATA_FOR_SENDING:
            return {
                ...state,
                dataForSending: action.payload
            };
    }
    return state;
};