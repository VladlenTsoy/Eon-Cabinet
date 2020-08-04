import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchDisciplines} from "./fetchDisciplines";
import {updateDiscipline} from "utils/api";

export interface Discipline {
    id: number;
    key: string;
    title: string;
}

interface StateProps {
    activeDisciplineId?: Discipline["id"];
    disciplines: Discipline[]
    fetchLoading: boolean;
}

const initialState: StateProps = {
    fetchLoading: true,
    activeDisciplineId: undefined,
    disciplines: []
};

const disciplineSlice = createSlice({
    name: 'discipline',
    initialState,
    reducers: {
        changeActiveDisciplineId(state, action: PayloadAction<Discipline["id"]>) {
            updateDiscipline(action.payload);
            state.activeDisciplineId = action.payload
        },
    },
    extraReducers: {
        [fetchDisciplines.pending]: (state) => {
            state.fetchLoading = true;
        },
        [fetchDisciplines.fulfilled]: (state, action:PayloadAction<Discipline[]>) => {
            // Add user to the state array
            if (action.payload) {
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
