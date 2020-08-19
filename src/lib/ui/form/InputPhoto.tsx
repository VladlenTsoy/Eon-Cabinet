import * as React from "react";
import AvatarLabelWrapper from "../avatar/Label";
// import {getBase64} from "../upload/Upload";
import {useState} from "react";
import {EditOutlined} from '@ant-design/icons';
import {IconsWrapper, IconEditWrapper} from "../avatar/IconsWrapper";
import {FormItem} from "../index";
import {FormInstance} from "antd/es/form";

interface InputPhotoProps {
    form: FormInstance
}

const InputPhoto: React.FC<InputPhotoProps> = ({form}) => {
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (e: any) => {
        // Get this url from response in real world.
        // return getBase64(e.target.files[0], (imageUrl: any) => {
        //     setImageUrl(imageUrl);
        //     form.setFieldsValue({image: imageUrl})
        // });
    };

    return (
        <FormItem name="image">
            <AvatarLabelWrapper>
                <img src={imageUrl || form.getFieldValue('image') || 'http://api.eon.uz/images/default.svg'}
                     alt="Изменить фотографию"/>
                <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={handleChange} hidden/>
                <IconsWrapper>
                    <IconEditWrapper><EditOutlined/> Изменить</IconEditWrapper>
                </IconsWrapper>
            </AvatarLabelWrapper>
        </FormItem>
    );
};

export default InputPhoto;