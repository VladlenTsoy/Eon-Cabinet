import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Stars from "./stars/Stars";
import Counter from "./counter/Counter";
import {message} from "antd";
import Image from "./Image/Image";

const TrophyWrapper: React.FC = styled.div`
  text-align: center;
  order: 2;
  
  @media (max-width: 992px) {
    order: 1;
    grid-column-start: 1;
    grid-column-end: 3;
  }  
  
  @media (max-width: 576px) {
    grid-column-end: 2;
  }
`;

interface TrophyProps {
    stats: {
        all: number;
        success: number;
    };
    result: boolean;
    resultData: any;
    loading: boolean;
    sounds: { [key: string]: HTMLAudioElement };
}

const Trophy: React.FC<TrophyProps> = (
    {
        stats,
        result,
        sounds,
        loading,
        resultData
    }
) => {
    const [error, setError] = useState(false);

    const handlerError = useCallback(() => {
        setError(true);
    }, []);

    useEffect(() => {
        if (error)
            message.error('Неизвестная ошибка со звуком!');
    }, [error]);



    return <TrophyWrapper>
        <Counter loadingResult={loading} resultData={resultData}/>
        <Image resultData={resultData} sounds={sounds} loading={loading} handlerError={handlerError}/>
        <Stars
            handlerError={handlerError}
            loading={loading}
            result={result}
            stats={stats}
            sounds={sounds}
        />
    </TrophyWrapper>;
};

export default Trophy;