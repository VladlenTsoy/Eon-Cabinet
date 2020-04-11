import React from "react";
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const WrapperLoader = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: ${props => props.theme['@body-background']};
    display: flex;
    z-index: 55555;
    align-items: center;  
    justify-content: center;
    flex-flow: column;
    
    i {
        //margin: 0 auto;
        font-size: 30px;
        margin-bottom: 1rem;
    }
`;

const TextWrapper = styled.p`
  font-weight: 400;  
`;


const Loader: React.FC<any> = ({text}) => {
    return (
        <WrapperLoader>
            <LoadingOutlined spin />
            {text ? <TextWrapper>{text}</TextWrapper> : null}
        </WrapperLoader>
    );
};

export default Loader;