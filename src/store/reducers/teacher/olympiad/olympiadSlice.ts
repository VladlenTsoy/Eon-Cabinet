import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchFutureOlympiads} from "./fetchFutureOlympiads";
import {fetchCurrentOlympiads} from "./fetchCurrentOlympiads";
import {fetchPastOlympiads} from "./fetchPastOlympiads";

interface Olympiad {
    id: number;
    title: string;
    access: 'public' | 'invite' | 'private';
    current_step: {
        start_at: string;
        step: number;
        end_at: string;
    }
    steps_count: number;
    students_count: number;
    last_step: {
        end_at: string;
    }
}

interface DataProps {
    data: Olympiad[],
    page: number;
    loading: boolean;
}

export interface StateProps {
    future: DataProps;
    past: DataProps;
    current: DataProps;
}

const initialState: StateProps = {
    future: {
        loading: true,
        data: [],
        page: 1,
    },
    current: {
        loading: true,
        data: [],
        page: 1,
    },
    past: {
        loading: true,
        data: [],
        page: 1,
    },
};

const olympiadSlice = createSlice({
    name: 'olympiad',
    initialState,
    reducers: {},
    extraReducers: {
        // [createOlympiad.fulfilled]: (state, action) => {
            // Add user to the state array
            // state.entities.push(action.payload)
        // },
        // [updateOlympiad.fulfilled]: (state, action) => {
            // Add user to the state array
            // state.entities.push(action.payload)
        // },
        [fetchFutureOlympiads.pending]: (state) => {
            state.future.loading = true;
        },
        [fetchFutureOlympiads.fulfilled]: (state, action) => {
            state.future.data = action.payload.data;
            state.future.page = action.payload.current_page;
            state.future.loading = false;
        },
        [fetchCurrentOlympiads.pending]: (state) => {
            state.current.loading = true;
        },
        [fetchCurrentOlympiads.fulfilled]: (state, action) => {
            state.current.data = action.payload;
            state.current.loading = false;
        },
        [fetchPastOlympiads.pending]: (state) => {
            state.future.loading = true;
        },
        [fetchPastOlympiads.fulfilled]: (state, action) => {
            state.past.data = action.payload.data;
            state.past.page = action.payload.current_page;
            state.past.loading = false;
        }
    }
});

export const olympiadSelector = (state: TeacherState) => state.olympiad;

export default olympiadSlice.reducer;
