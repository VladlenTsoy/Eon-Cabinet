import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchFutureOlympiads} from "./fetchFutureOlympiads";
import {fetchCurrentOlympiads} from "./fetchCurrentOlympiads";
import {fetchPastOlympiads} from "./fetchPastOlympiads";
import {fetchOlympiad} from "./fetchOlympiad";

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
    pageIndex: number;
    total: number;
    loading: boolean;
}

export interface StateProps {
    future: DataProps;
    past: DataProps;
    current: DataProps;
    detail: {
        loading: boolean
        data: any | null,
        error: any
    }
}

const initialState: StateProps = {
    future: {
        loading: true,
        data: [],
        pageIndex: 1,
        total: 0,
    },
    current: {
        loading: true,
        data: [],
        pageIndex: 1,
        total: 0,
    },
    past: {
        loading: true,
        data: [],
        pageIndex: 1,
        total: 0,
    },
    detail: {
        loading: true,
        data: null,
        error: null
    }
};

const olympiadSlice = createSlice({
    name: 'olympiad',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFutureOlympiads.pending, (state) => {
            state.future.loading = true;
        })
        builder.addCase(fetchFutureOlympiads.fulfilled, (state, action) => {
            state.future.data = action.payload.data;
            state.future.pageIndex = action.payload.current_page;
            state.future.total = action.payload.total;
            state.future.loading = false;
        })
        builder.addCase(fetchFutureOlympiads.rejected, (state) => {
            state.future.loading = false;
        })
        ////
        builder.addCase(fetchCurrentOlympiads.pending, (state) => {
            state.current.loading = true;
        })
        builder.addCase(fetchCurrentOlympiads.fulfilled, (state, action) => {
            state.current.data = action.payload;
            state.current.loading = false;
        })
        builder.addCase(fetchCurrentOlympiads.rejected, (state) => {
            state.current.loading = false;
        })
        ////
        builder.addCase(fetchPastOlympiads.pending, (state) => {
            state.current.loading = true;
        })
        builder.addCase(fetchPastOlympiads.fulfilled, (state, action) => {
            state.past.data = action.payload.data;
            state.past.pageIndex = action.payload.current_page;
            state.past.total = action.payload.total;
            state.past.loading = false;
        })
        builder.addCase(fetchPastOlympiads.rejected, (state) => {
            state.current.loading = false;
        })
        ////
        builder.addCase(fetchOlympiad.pending, (state) => {
            state.detail.loading = true;
        })
        builder.addCase(fetchOlympiad.fulfilled, (state, action) => {
            state.detail.data = action.payload;
            state.detail.loading = false;
        })
    }
});

export const olympiadSelector = (state: TeacherState) => state.olympiad;

export default olympiadSlice.reducer;
