import {createSlice} from "@reduxjs/toolkit"
import {TeacherState} from "../store"
import {createList} from "./createList"

export interface StateProps {
}

export const initialState: StateProps = {}

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createList.fulfilled, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const listsSelector = (state: TeacherState) => state.lists

export default listsSlice.reducer
