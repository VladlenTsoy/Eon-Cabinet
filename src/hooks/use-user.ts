import {useSelector} from "react-redux";
import {userSelector} from "../store/common/user/userSlice";

export const useUser = (): any => {
    const user = useSelector(userSelector)

    const updateUser = () => {}

    return {user: user.detail, updateUser};
};