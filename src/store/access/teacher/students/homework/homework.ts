import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {StateProps} from "../studentsSlice";
import {fetchStudentsHomeworkDates} from "./fetchStudentsHomeworkDates";
import moment from "moment";

export interface StudentHomeworkTask {
    task_name: string;
    first: {
        count_success: number;
        exodus: boolean;
        view: number;
        created_at: number;
    }
    count_all: number;
    created_at: string;
}

export interface Homework {
    id: number;
    level: number;
    homework_id: number;
    status: number;
    tasks: StudentHomeworkTask[];
    user_id: number;
    created_at: string;
}

export type StudentHomework = { [user_id: number]: Homework[] }

export interface HomeworkState {
    weekState: number;
    loading: boolean
    data: StudentHomework
    dates: any
    error: any
    startOfWeek: any
    endOfWeek: any
}

const getDates = (_i: number) => {
    const startOfWeek = moment().startOf('week').subtract(_i, 'week');
    const endOfWeek = moment().endOf('week').subtract(_i, 'week');

    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.format());
        day = day.clone().add(1, 'd');
    }
    return {days, startOfWeek: startOfWeek.format(), endOfWeek: endOfWeek.format()};
}

export const homeworkState: HomeworkState = {
    weekState: 0,
    loading: false,
    data: [],
    dates: getDates(0).days.map((day) => ({day, events: null})),
    error: null,
    startOfWeek: moment().startOf('week').subtract(0, 'week').format(),
    endOfWeek: moment().endOf('week').subtract(0, 'week').format(),
}

export const homeworkReducer = {
    nextWeek: (state: StateProps) => {
        state.homework.loading = true;
        const {days, startOfWeek, endOfWeek} = getDates(--state.homework.weekState)
        state.homework.startOfWeek = startOfWeek
        state.homework.endOfWeek = endOfWeek
        state.homework.dates = days.map((day) => ({day, events: null}))
    },
    prevWeek: (state: StateProps) => {
        state.homework.loading = true;
        const {days, startOfWeek, endOfWeek} = getDates(++state.homework.weekState)
        state.homework.startOfWeek = startOfWeek
        state.homework.endOfWeek = endOfWeek
        state.homework.dates = days.map((day) => ({day, events: null}))
    }
}

export const homeworkExtraReducer = (builder: ActionReducerMapBuilder<StateProps>) => {
    builder.addCase(fetchStudentsHomeworkDates.pending, (state) => {
        state.homework.loading = true;
    })
    builder.addCase(fetchStudentsHomeworkDates.fulfilled, (state, action) => {
        state.homework.dates = state.homework.dates.map((date: any) => {
            date.events = action.payload[Number(moment(date.day).format('e'))]
            return date;
        });
        state.homework.loading = false;
    })
    builder.addCase(fetchStudentsHomeworkDates.rejected, (state) => {
        state.homework.loading = false;
    })
}