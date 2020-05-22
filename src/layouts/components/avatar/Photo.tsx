import * as React from "react";
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Modal } from "antd";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUserData} from "../../../store/reducers/common/user/actions";
import {IconsWrapper, IconWrapper, IconEditWrapper} from "./IconsWrapper";
import AvatarLabelWrapper from "./Label";

const {confirm} = Modal;


interface PhotoBlockProps {
    currentUser: any;
    changeDataCurrentUser: any;
}

const PhotoBlock:React.FC<PhotoBlockProps> = ({currentUser, changeDataCurrentUser}: any) => {
    const {api, language, user} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChangeImage = (e: any) => {
        if (loading) return;
        const file = e.currentTarget.files[0];
        confirm({
            title: 'Вы уверены что хотите изменить фотографию?',
            okText: 'Да',
            async onOk() {
                await changeProfileImage(file);
            },
        });
    };

    const changeProfileImage = async (file: any) => {
        let data = new FormData(),
            img = file;

        if (img.type !== "image/jpeg" &&
            img.type !== "image/png" &&
            img.type !== "image/jpg" &&
            img.type !== "image/gif")
            return message.error('Неверный формат, попробуйте другую фотографию!');

        data.append("images", img);
        setLoading(true);

        try {
            const response = await api.user_general.post(`/${currentUser.id}/image`, data);
            message.success(language.common['youHaveSuccessfullyChangedThePhoto']);
            if (currentUser.id === user.id)
                dispatch(setCurrentUserData(response.data.data));
            else
                changeDataCurrentUser({...currentUser, ...response.data.data});
        } catch (e) {
            message.error(language.common['cx002']);
        }
        setLoading(false);
    };

    return (
        <AvatarLabelWrapper>
            <img src={currentUser.image} alt={`${currentUser.first_name} ${currentUser.last_name}`}/>
            <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChangeImage}/>
            <IconsWrapper>
                {loading ?
                    <IconWrapper><LoadingOutlined /></IconWrapper> :
                    <IconEditWrapper><EditOutlined /> Изменить</IconEditWrapper>}
            </IconsWrapper>
        </AvatarLabelWrapper>
    );
};

export default PhotoBlock;