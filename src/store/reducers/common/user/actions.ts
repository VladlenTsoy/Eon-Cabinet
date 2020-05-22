import {Dispatch} from "redux";
import {APP_CHANGE_LOADING} from "../app/actions";

export const FETCH_CURRENT_USER_DATA = "FETCH_CURRENT_USER_DATA";
export const SET_CURRENT_USER_DATA = "SET_CURRENT_USER_DATA";
export const FETCH_CURRENT_USER_ERROR = "FETCH_CURRENT_USER_DATA";
export const DELETE_CURRENT_USER_DATA = "DELETE_CURRENT_USER_DATA";

export const fetchCurrentUserData = () =>
    async (dispatch: Dispatch, getState: any) => {
        try {
            if (getState().api.token) {
                let response = await getState().api.user_general.get('');
                if (response)
                    dispatch({type: FETCH_CURRENT_USER_DATA, payload: response.data});
            }
        } catch (e) {
            console.log(e);
            // dispatch({type: FETCH_CURRENT_USER_ERROR, payload: e.response.data})
        }
        dispatch({type: APP_CHANGE_LOADING, payload: false});
    };

export const setCurrentUserData = (data: any) =>
    (dispatch: Dispatch) =>
        dispatch({type: SET_CURRENT_USER_DATA, payload: data});

export const deleteCurrentUserData = () =>
    (dispatch: Dispatch) =>
        dispatch({
            type: DELETE_CURRENT_USER_DATA,
            payload: {
                id: null,
            }
        });