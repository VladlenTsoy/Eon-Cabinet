import React, {useState} from "react";
import {PlusOutlined} from '@ant-design/icons';
import styled from "styled-components";
import {FormItem} from "../index";

const UploadWrapper = styled.div`
  width: 100%;
  text-align: center;

  label {
    display: flex;
    height: 136px;
    background-color: ${props => props.theme['@layout-body-background']};
    border: 1px dashed ${props => props.theme.light_color_border};
    border-radius: 4px;
    cursor: pointer;
    align-items: center;
    padding: 1rem;

    .add-icon{
      font-size: 35px;
      margin: 0 auto;
    }

    img{
      max-width: 100%;
      height: 100%;
      margin: 0 auto;
      object-fit: contain;
    }

    input {
      display: none;
    }
  }
`;

export const getBase64 = (img: Blob, callback: { (imageUrl: any): void; (arg0: string | ArrayBuffer | null): void; }) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

interface UploadInputProps {
    form: any;
    name: string;
    label?: string;
    requiredMsg?: string;
    rules?: any;
}

// TODO - Нужно просмотреть Form для изменения
const UploadInput: React.FC<UploadInputProps> = ({form, name, label, requiredMsg, rules}) => {
    const [imageUrl, setImageUrl] = useState();

    const handleChange = (e: any) => {
        // Get this url from response in real world.
        return getBase64(e.target.files[0], (imageUrl: any) => {
            setImageUrl(imageUrl);
            form.setFieldsValue({[name]: imageUrl})
        });
    };

    return <FormItem
        label={label} name={name}
        rules={rules || (requiredMsg ? [{required: true, message: requiredMsg}] : null)}
    >
        <UploadWrapper>
            <label>
                {imageUrl || form.getFieldValue(name) ?
                    <img src={imageUrl || form.getFieldValue(name)} alt="upload"/> :
                    <PlusOutlined className="add-icon"/>}
                <input type="file" onChange={handleChange} hidden/>
            </label>
        </UploadWrapper>
    </FormItem>
};

export default UploadInput;