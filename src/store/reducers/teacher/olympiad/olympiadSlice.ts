import {createSlice} from '@reduxjs/toolkit'
import {TeacherState} from "../store";
import {createOlympiad} from './createOlympiad';
import {updateOlympiad} from "./updateOlympiad";

export interface StateProps {
    list: any[]
}

const initialState: StateProps = {
    list: [],
};



const olympiadSlice = createSlice({
    name: 'olympiad',
    initialState,
    reducers: {},
    extraReducers: {
        [createOlympiad.fulfilled]: (state, action) => {
            // Add user to the state array
            // state.entities.push(action.payload)
        },
        [updateOlympiad.fulfilled]: (state, action) => {
            // Add user to the state array
            // state.entities.push(action.payload)
        }
    }
});

export const olympiadSelector = (state: TeacherState) => state.olympiad;

export const {} = olympiadSlice.actions;

export default olympiadSlice.reducer;
