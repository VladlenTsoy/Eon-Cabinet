import React, {useState} from "react";
import { FileImageOutlined } from '@ant-design/icons';
import styled from "styled-components";

interface ImageProps {
    src: string;
    alt: string;
    width: string;
}

const ImageWrapper = styled.div`
  display: block;
  
 img{
    object-fit: contain;
 }
`;

const IconWrapper = styled(ImageWrapper)`
   display: flex;
   align-items: center;
   //justify-content: center;
   color: ${props => props.theme.color_second};
   
  i{
    font-size: 30px;
  }
`;

const Image: React.FC<ImageProps> = ({src, alt, width}) => {
    const [error, setError] = useState(false);
    const handleError = (e: any) => {
        e.target.src = 'https://api.eon.uz/images/centers/1/logo.png';
        e.target.onError = null;
        setError(true);
    };

    return error ?
        <IconWrapper>
            <FileImageOutlined />
        </IconWrapper> :
        <ImageWrapper>
            <img src={src} alt={alt} width={width} onError={handleError}/>
        </ImageWrapper>;
};

export default Image;