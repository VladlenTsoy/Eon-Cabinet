import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchDisciplines} from "./fetchDisciplines";
import {updateDiscipline} from "../../../../utils/api";

interface StateProps {
    activeDisciplineId: string | undefined;
    disciplines: object[]
}

const initialState: StateProps = {
    activeDisciplineId: undefined,
    disciplines: []
};

const disciplineSlice = createSlice({
    name: 'discipline',
    initialState,
    reducers: {
        changeActiveDisciplineId(state, action: PayloadAction<string | undefined>) {
            updateDiscipline(action.payload);
            state.activeDisciplineId = action.payload
        },
    },
    extraReducers: {
        [fetchDisciplines.fulfilled]: (state, action) => {
            // Add user to the state array
            if (action.payload.length) {
                const discipline = action.payload[0]
                updateDiscipline(discipline.id);
                state.activeDisciplineId = discipline.id
            }
            state.disciplines = action.payload;
        }
    }
});

export const disciplineSelector = (state: TeacherState) => state.discipline;

export const {changeActiveDisciplineId} = disciplineSlice.actions;

export default disciplineSlice.reducer;
