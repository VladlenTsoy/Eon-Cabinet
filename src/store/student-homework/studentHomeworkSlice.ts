import {createSlice} from "@reduxjs/toolkit"
import moment from "moment"
import {fetchStudentsHomeworkDates} from "./fetchStudentsHomeworkDates"
import {StoreState} from "store"

export interface StateProps {
    weekState: number;
    loading: boolean
    dates: any
    error: any
    startOfWeek: any
    endOfWeek: any
}

const getDates = (_i: number) => {
    const startOfWeek = moment().startOf("week").subtract(_i, "week")
    const endOfWeek = moment().endOf("week").subtract(_i, "week")

    const days = []
    let day = startOfWeek

    while (day <= endOfWeek) {
        days.push(day.format())
        day = day.clone().add(1, "d")
    }
    return {days, startOfWeek: startOfWeek.format(), endOfWeek: endOfWeek.format()}
}

const initialState: StateProps = {
    weekState: 0,
    loading: false,
    dates: getDates(0).days.map((day) => ({day, events: null})),
    error: null,
    startOfWeek: moment().startOf("week").subtract(0, "week").format(),
    endOfWeek: moment().endOf("week").subtract(0, "week").format()
}

const studentHomeworkSlice = createSlice({
    name: "studentHomework",
    initialState,
    reducers: {
        nextWeek: (state) => {
            state.loading = true
            const {days, startOfWeek, endOfWeek} = getDates(--state.weekState)
            state.startOfWeek = startOfWeek
            state.endOfWeek = endOfWeek
            state.dates = days.map((day) => ({day, events: null}))
        },
        prevWeek: (state) => {
            state.loading = true
            const {days, startOfWeek, endOfWeek} = getDates(++state.weekState)
            state.startOfWeek = startOfWeek
            state.endOfWeek = endOfWeek
            state.dates = days.map((day) => ({day, events: null}))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudentsHomeworkDates.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchStudentsHomeworkDates.fulfilled, (state, action) => {
            state.dates = state.dates.map((date: any) => {
                date.events = action.payload[Number(moment(date.day).format("e"))]
                return date
            })
            state.loading = false
        })
        builder.addCase(fetchStudentsHomeworkDates.rejected, (state) => {
            state.loading = false
        })
    }
})

export const studentHomeworkSelector = (state: StoreState) => state.studentHomework

export const {nextWeek, prevWeek} = studentHomeworkSlice.actions

export default studentHomeworkSlice.reducer
