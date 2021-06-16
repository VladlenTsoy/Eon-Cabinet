import React, {useState} from "react"
import styled from "styled-components"
import {FileImageOutlined} from "@ant-design/icons"

const ImageWrapper = styled.div`
    display: block;
    height: 120px;
    width: 100%;
    padding: 0 1rem;
    margin-bottom: 1rem;

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
`

const IconWrapper = styled<any>(ImageWrapper)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.color_second};

    i {
        font-size: 50px;
    }
`

interface CardImageProps {
    src: string
    alt: string
}

const CardImage: React.FC<CardImageProps> = ({src, alt}) => {
    const [error, setError] = useState(false)
    const handleError = (e: any) => {
        e.target.src = "https://api.eon.uz/images/centers/1/logo.png"
        e.target.onError = null
        setError(true)
    }

    return error ? (
        <IconWrapper>
            <FileImageOutlined />
        </IconWrapper>
    ) : (
        <ImageWrapper>
            <img src={src} alt={alt} onError={handleError} />
        </ImageWrapper>
    )
}

export default CardImage
