import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchUser} from "./fetchUser";
import {StoreState} from "../../store";
import {updateUser} from "./updateUser";
import {logoutUser} from "./logoutUser";
import {authUser} from "./authUser";
import {registrationUser} from "./registrationUser";
import {updateToken} from "../../../utils/api";
import cookie from "js-cookie";
import {verificationCodeConfirmEmail} from "./email-confirmation/verificationCodeConfirmEmail";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
    image: string;
    access: 'student' | 'teacher' | 'director-franchise' | 'admin';
    status: 'active' | 'test'
    lang_id?: string
    setting: {
        is_dark: boolean;
    }
    created_at: string;
}

interface StateProps {
    token: string | null;
    loading: boolean;
    detail: User | null;
}

const initialState: StateProps = {
    token: cookie.get('token_access') || null,
    detail: null,
    loading: true,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            updateToken(action.payload);
            if (action.payload === null)
                state.detail = null;
        }
    },
    extraReducers: {
        //
        [fetchUser.pending]: (state) => {
            state.loading = true;
        },
        [fetchUser.fulfilled]: (state: StateProps, action: PayloadAction<User>) => {
            state.detail = action.payload;
            state.loading = false;
        },
        [fetchUser.rejected]: (state) => {
            state.loading = false;
        },

        //
        // [updateUser.pending]: (state) => {
        //     state.loading = true;
        // },
        [updateUser.fulfilled]: (state: StateProps, action: PayloadAction<User>) => {
            state.detail = action.payload;
            // state.loading = false;
        },

        //
        [authUser.fulfilled]: (state: StateProps, action: PayloadAction<{ token: StateProps['token'] }>) => {
            state.token = action.payload.token;
            updateToken(action.payload.token);
        },

        //
        [registrationUser.fulfilled]: (state: StateProps, action: PayloadAction<{ token: StateProps['token'] }>) => {
            state.token = action.payload.token;
            updateToken(action.payload.token);
        },

        //
        [verificationCodeConfirmEmail.fulfilled]: (state: StateProps, action: PayloadAction<{ message: string, user: { email_verified_at: User['email_verified_at'] } }>) => {
            // if (state.detail)
            //     state.detail.email_verified_at = action.payload.user.email_verified_at;
        },

        //
        [logoutUser.pending]: (state) => {
            state.loading = true;
        },
        [logoutUser.fulfilled]: (state: StateProps) => {
            updateToken(null);
            state.token = null;
            state.detail = null;
            state.loading = false;
        },
    }
});

export const {changeToken} = userSlice.actions;

export const userSelector = (state: StoreState) => state.user;

export default userSlice.reducer;
