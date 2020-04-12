import React, {useState} from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from "antd";
import styled from "styled-components";

const UploadWrapper = styled.div`
  width: 100%;
  text-align: center;

  label {
    display: flex;
    height: 136px;
    background-color: #fafafa;
    border: 1px dashed #d9d9d9;
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
    required?: string;
    rules?: any;
}

// TODO - Нужно просмотреть Form для изменения
const UploadInput:React.FC<UploadInputProps> = ({form, name, label, required, rules}) => {
    const [imageUrl, setImageUrl] = useState();
    const {getFieldDecorator} = form;

    const handleChange = (e: { target: { files: Blob[]; }; }) => {
        // Get this url from response in real world.
        return getBase64(e.target.files[0], (imageUrl: any) => {
            setImageUrl(imageUrl);
            form.setFieldsValue({[name]: imageUrl})
        });
    };

    return (
        <Form.Item label={label}>
            <UploadWrapper>
                <label>
                    {imageUrl || form.getFieldValue(name) ?
                        <img src={imageUrl || form.getFieldValue(name)} alt="upload"/> :
                        <PlusOutlined className="add-icon" />}
                    <input type="file"
                            // @ts-ignore
                           onChange={handleChange} hidden/>
                    {getFieldDecorator(name, {
                        rules: rules || (required ? [{required: true, message: required}] : null),
                    })(
                        <Input/>
                    )}
                </label>
            </UploadWrapper>
        </Form.Item>
    );
};

export default UploadInput;