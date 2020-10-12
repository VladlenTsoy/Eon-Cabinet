import React, {useLayoutEffect} from "react"
import styled from "styled-components"
import {useState} from "react"
import DefaultImage from "assets/images/profile/default.svg"
import {LoadingOutlined} from "@ant-design/icons"

interface AvatarStyledProps {
    width?: string
    mr?: string
}

const AvatarStyled: React.FC<AvatarStyledProps> = styled.div<AvatarStyledProps>`
    margin-right: ${props => props.mr || "initial"};
    height: ${props => props.width};
    width: ${props => props.width};
    border-radius: 50%;
    overflow: hidden;
    background: ${props => props.theme['@layout-body-background']};
    display: flex;
    align-items: center;
    justify-content: center;

    .loading {
        font-size: 38px;
        transform: scale(0.5);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

interface UserImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string
    alt?: string
    width?: string
    mr?: string
}

/**
 * Фото профиля
 * @param src
 * @param alt
 * @param width
 * @param mr
 * @param props
 * @constructor
 */
const Avatar: React.FC<UserImageProps> = ({src, alt, width = "38px", mr}) => {
    const [image, setImage] = useState<any>(src)
    const [loading, setLoading] = useState(true)

    useLayoutEffect(() => {
        const image = new Image()
        setImage(src)
        image.src = src
        image.onerror = () => {
            setImage(DefaultImage)
            setLoading(false)
        }
        image.onload = () => setLoading(false)
        return () => {
            image.onload = null
        }
    }, [src])

    return (
        <AvatarStyled mr={mr} width={width}>
            {loading ? (
                <LoadingOutlined className="loading" />
            ) : (
                <img src={image} alt={alt || "profile-image"} />
            )}
        </AvatarStyled>
    )
}

export default Avatar
