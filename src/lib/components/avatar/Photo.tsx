import React from "react";
import {EditOutlined, LoadingOutlined} from '@ant-design/icons';
import {message, Modal} from "antd";
import {useState} from "react";
import {IconsWrapper, IconWrapper, IconEditWrapper} from "./IconsWrapper";
import AvatarLabelWrapper from "./Label";
import {useDispatch} from "react-redux";
import {updateImageUser} from "../../../store/common/user/updateImageUser";

const {confirm} = Modal;

interface PhotoBlockProps {
    currentUser: any;
    changeDataCurrentUser: any;
}

const PhotoBlock: React.FC<PhotoBlockProps> = ({currentUser}: any) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

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
        await dispatch(updateImageUser({userId: currentUser.id, data}))
        setLoading(false);
    };

    return <AvatarLabelWrapper>
        <img src={currentUser.image} alt={`${currentUser.first_name} ${currentUser.last_name}`}/>
        <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChangeImage}/>
        <IconsWrapper>
            {
                loading ?
                    <IconWrapper><LoadingOutlined/></IconWrapper> :
                    <IconEditWrapper><EditOutlined/> Изменить</IconEditWrapper>
            }
        </IconsWrapper>
    </AvatarLabelWrapper>
};

export default PhotoBlock;