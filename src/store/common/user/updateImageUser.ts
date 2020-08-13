import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../../utils/api";
import {message} from "../../../utils/message";

interface ParamsProps {
    userId: string;
    data: object
}

export const updateImageUser: any = createAsyncThunk<any, ParamsProps, any>(
    'user/image/update',
    async ({userId, data}, {getState}: any) => {
        const {language} = getState()
        //
        const response = await apiRequest('post', `/${userId}/image`, {data});
        response && message({type: 'success', content: `${language.data.common['youHaveSuccessfullyChangedThePhoto']}!`});
        return response;
    }
)