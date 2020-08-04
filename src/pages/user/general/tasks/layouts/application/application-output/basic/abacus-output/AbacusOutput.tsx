import styled from "styled-components";
import {OutputWrapper} from "../output/Output";
import React from "react";
import Abacus from "./abacus/Abacus";

interface AbacusOutputStyleProps extends React.HTMLAttributes<HTMLDivElement> {
    time: number;
}

const AbacusOutputWrapper: React.FC<AbacusOutputStyleProps> = styled(OutputWrapper)<AbacusOutputStyleProps>`
    height: 500px;
    width: ${(props: any) => props.theme.double ? '50%' : '100%'};
    overflow: hidden;
    border-radius: 10px;
    animation: pulsar-primary ${props => props.time}s ease-in-out infinite;

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
    return <AbacusOutputWrapper time={setting.time}>
        <Abacus output={output} setting={setting} double={double}/>
    </AbacusOutputWrapper>;
};

export default AbacusOutput;