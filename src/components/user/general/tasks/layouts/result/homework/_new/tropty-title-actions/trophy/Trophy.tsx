import React from 'react';
import ImageWin from "../../../../../../../../../../assets/images/illustrations/trophy.svg";
import styled from "styled-components";

const TrophyWrapper: any = styled.div<any>`
  img {
    filter: grayscale(${(props: any) => props.result === 'true' ? '0' : '1'});
    width: 100%;
  }
  @media (max-width: 768px) {
    padding: 1rem 7rem 0;
  }
`;

interface TrophyProps {
    result: boolean;
}

const Trophy: React.FC<TrophyProps> = ({result}) => {
    return <TrophyWrapper result={result.toString()}>
        <img src={ImageWin} alt="win" className={`animated ${result ? 'tada' : 'shake'}`}/>
    </TrophyWrapper>;
};

export default Trophy;