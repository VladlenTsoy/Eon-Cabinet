import React from 'react';
import styled from "styled-components";
import {BasicOutputWrapper} from "./BasicOutput";
import Abacus from "./abacus/Abacus";

const AbacusOutputWrapper: any = styled<any>(BasicOutputWrapper)`
    height: 500px;
    width: ${(props: any) => props.theme.double ? '50%' : '100%'};
    overflow: hidden;
    border-radius: 10px;
    &:nth-of-type(2){
     margin-left: 2rem;
    }
`;

interface AbacusOutputProps {
    setting: any;
    output: string;
    double?: boolean;
}

const AbacusOutput: React.FC<AbacusOutputProps> = ({setting, output, double}) => {
    return <AbacusOutputWrapper
        style={{animation: `pulsar-primary ${setting.time}s linear infinite`}}>
        <Abacus output={output} setting={setting} double={double}/>
    </AbacusOutputWrapper>;
};

export default AbacusOutput;