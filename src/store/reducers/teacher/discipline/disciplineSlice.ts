import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchDisciplines} from "./fetchDisciplines";
import {updateDiscipline} from "../../../../utils/api";

interface StateProps {
    activeDisciplineId: number;
    disciplines: object[]
    fetchLoading: boolean;
}

const initialState: StateProps = {
    fetchLoading: true,
    activeDisciplineId: 1,
    disciplines: []
};

const disciplineSlice = createSlice({
    name: 'discipline',
    initialState,
    reducers: {
        changeActiveDisciplineId(state, action: PayloadAction<number>) {
            updateDiscipline(action.payload);
            state.activeDisciplineId = action.payload
        },
    },
    extraReducers: {
        [fetchDisciplines.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchDisciplines.fulfilled]: (state, action) => {
            // Add user to the state array
            if (action.payload.length) {
                const discipline = action.payload[0]
                updateDiscipline(discipline.id);
                state.activeDisciplineId = discipline.id
            }
            state.disciplines = action.payload;
            state.fetchLoading = false;
        }
    }
});

export const disciplineSelector = (state: TeacherState) => state.discipline;

export const {changeActiveDisciplineId} = disciplineSlice.actions;

export default disciplineSlice.reducer;
