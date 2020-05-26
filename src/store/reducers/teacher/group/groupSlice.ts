import {createSlice} from '@reduxjs/toolkit'

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
    reducers: {}
});

export default groupSlice.reducer
