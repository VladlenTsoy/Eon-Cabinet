import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {fetchDisciplines} from "./fetchDisciplines";
import {updateDiscipline} from "utils/api";
import {Discipline} from "../../../../lib/types/common/Discipline";

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
    extraReducers: (builder) => {
        builder.addCase(fetchDisciplines.pending, (state) => {
            state.fetchLoading = true;
        })
        builder.addCase(fetchDisciplines.fulfilled, (state, action) => {
            // Add user to the state array
            if (action.payload) {
                const discipline = action.payload[0]
                updateDiscipline(discipline.id);
                state.activeDisciplineId = discipline.id
            }
            state.disciplines = action.payload;
            state.fetchLoading = false;
        })
    }
});

export const disciplineSelector = (state: TeacherState) => state.discipline;

export const {changeActiveDisciplineId} = disciplineSlice.actions;

export default disciplineSlice.reducer;