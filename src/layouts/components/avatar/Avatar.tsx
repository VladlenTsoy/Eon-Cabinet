import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import DefaultImage from 'assets/images/profile/default.svg'
import {LoadingOutlined} from '@ant-design/icons'
import {v4 as uuidv4} from 'uuid';

interface ImageWrapperProps {
    width?: string,
    mr?: string,
}

const ImageWrapper: React.FC<ImageWrapperProps> = styled.div<ImageWrapperProps>`
  margin-right: ${props => props.mr || 'initial'};
  height: ${props => props.width};
  width: ${props => props.width};
  
  .loading{
    transform: scale(0.5);
  }
  
  svg{
    overflow: hidden;
    width: ${props => props.width};
    height: ${props => props.width};
    
    circle,
    rect {
      fill: white;
      stroke-width: 2;
      stroke: rgba(0, 0, 0, 0.1);
    }
    
    image {
      width: ${props => props.width};
      height: ${props => props.width};   
    }
    
    g {
      rect,
      circle {
        fill: none;
      }
    }
  }
`;

interface UserImageProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string,
    alt?: string,
    width?: string,
    mr?: string,
}

const Avatar: React.FC<UserImageProps> = (
    {
        src,
        width = '38px',
        mr,
    }
) => {
    const w = Number(width.match(/\d+/)) / 2;
    const time = uuidv4();
    const [image, setImage] = useState<any>(src);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const image = new Image();
        image.src = src;
        image.onerror = () => {
            setImage(DefaultImage);
            setLoading(false);
        };
        image.onload = () => setLoading(false);
    }, [src]);

    return <ImageWrapper mr={mr} width={width}>
        {
            loading ?
                <LoadingOutlined className="loading"/> :
                <svg role="none">
                    <mask id={`avatar-${time}`}>
                        <circle cx={w} cy={w} r={w}/>
                    </mask>
                    <g mask={`url(#avatar-${time})`}>
                        <image
                            x="0" y="0"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            width="100%"
                            xlinkHref={image}
                        />
                        <circle cx={w} cy={w} r={w}/>
                    </g>
                </svg>
        }
    </ImageWrapper>
};

export default Avatar;