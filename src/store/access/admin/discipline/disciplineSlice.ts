import {Discipline} from "../../../../lib/types/common/Discipline";
import {createSlice} from "@reduxjs/toolkit";
import {AdminState} from "../store";
import {fetchDisciplines} from "./fetchDisciplines";

interface StateProps {
    disciplines: Discipline[]
    loading: boolean;
}

const initialState: StateProps = {
    loading: true,
    disciplines: []
};

const disciplineSlice = createSlice({
    name: 'discipline',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDisciplines.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchDisciplines.fulfilled, (state, action) => {
            state.disciplines = action.payload.data
            state.loading = false
        })
    }
});

export const disciplineSelector = (state: AdminState) => state.discipline;

export const {} = disciplineSlice.actions;

export default disciplineSlice.reducer;
