import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiRequest} from "../../utils/api";
import {message} from "lib/ui";
import {AppThunkProps} from "store";
import {User} from "../../lib/types/common/User";

interface ParamsProps {
    userId: User['id']
    data: FormData
}

type ReturnedType = User

export const updateImageUser = createAsyncThunk<ReturnedType, ParamsProps, AppThunkProps>(
    'user/image/update',
    async ({userId, data}, {getState}) => {
        const {language} = getState()
        //
        const response = await apiRequest('post', `/${userId}/image`, {data, api2: true});
        response && message({
            type: 'success',
            content: `${language.data.common['youHaveSuccessfullyChangedThePhoto']}!`
        });
        return response;
    }
)
