import {FETCH_LANGUAGE} from "./actions";

export const languageReducer = (state: any = {
    id: null,
}, action: any) => {
    switch (action.type) {
        case FETCH_LANGUAGE:
            return {
                ...state,
                ...action.payload
            };
    }
    return state;
};