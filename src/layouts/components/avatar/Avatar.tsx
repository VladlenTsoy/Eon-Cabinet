import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import DefaultImage from '../../../assets/images/profile/default.svg'

interface UserImageProps {
    className?: string;
    src: string,
    alt: string,
    width?: string,
    mr?: string,
}

const UserImageWrapper = styled.div<any>`
  background: ${props => props.theme['@layout-body-background']};
  border: 2px solid ${props => props.theme['@layout-body-background']};
  border-radius: 50%;
  box-shadow: ${props => props.theme.shadow_primary};
  display: flex;
  overflow: hidden;
  height: ${props => props.width};
  width: ${props => props.width};
  margin-right: ${props => props.mr || 'initial'};

  img{
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const Avatar: React.FC<UserImageProps> = (
    {
        src,
        alt,
        width = '38px',
        mr,
        ...props
    }
) => {
    const [, setError] = useState(false);
    const handleError = (e: any) => {
        // e.target.src = 'http://api2.eon.uz/images/default.svg';
        e.target.src = DefaultImage;
        e.target.onError = null;
        setError(true);
    };

    return <UserImageWrapper mr={mr} width={width} {...props}>
        <img src={src} alt={alt} onError={handleError}/>
    </UserImageWrapper>
};

export default Avatar;