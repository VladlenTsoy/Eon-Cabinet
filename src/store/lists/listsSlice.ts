import {createSlice} from "@reduxjs/toolkit"
import {StoreState} from "store"
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

export const listsSelector = (state: StoreState) => state.lists

export default listsSlice.reducer
