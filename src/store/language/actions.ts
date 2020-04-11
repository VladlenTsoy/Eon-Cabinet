import {Dispatch} from "redux";

export const FETCH_LANGUAGE = "FETCH_LANGUAGE";

export const fetchCurrentLanguage = () =>
    async (dispatch: Dispatch, getState: any) => {
        try {
            let response = await getState().api.guest.get('/language');
            dispatch({type: FETCH_LANGUAGE, payload: response.data.data});
        } catch (e) {
            console.log(e);
        }
    };
