import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TeacherState} from "../store";

interface GroupProps {
    id: number;
    title: string;
    method_id: number;
    category_id: number;
}

interface StateProps {
    group: GroupProps | null
    isSaved: boolean;
    selectedStudentsId: number[];
}

const initialState: StateProps = {
    group: null,
    isSaved: false,
    selectedStudentsId: [],
};

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        changeGroup(state, action: PayloadAction<GroupProps>) {
            state.group = action.payload
        },
        changeIsSaved(state, action: PayloadAction<boolean>){
            state.isSaved = action.payload
        },
        changeSelectedStudentsId(state, action: PayloadAction<number[]>){
            state.selectedStudentsId = action.payload
        }
    }
});

export const groupSelector = (state: TeacherState) => state.group;

export const {changeGroup, changeIsSaved, changeSelectedStudentsId} = groupSlice.actions;

export default groupSlice.reducer;
