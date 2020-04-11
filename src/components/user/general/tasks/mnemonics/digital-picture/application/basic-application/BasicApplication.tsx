import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ApplicationAnzanWrapper from "../../../../layouts/application/anzan/Anzan.layout";
import {gameChangeStatus} from "../../../../../../../../store/game/actions";
import styled from "styled-components";
import {Card} from "lib";
import {useAddInternal} from "../../../../../../../../effects/use-add-interval.effect";

const BasicWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
  
  > div{
    width: 550px;
    height: 310px;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    top: 310px;
    opacity: 0;
    animation: fadeAndTop 0.5s ease-in-out forwards;
    
    @media (max-width: 576px) {
      width: 250px;
      height: 155px;   
      top: 155px;
    }
  }
  
  .first{
    margin-right: 1.5rem;
    
    img{
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
    
    @media (max-width: 576px) {
      margin-right: 0;
      margin-bottom: 1.5rem;
    }
  }
  
  .second{
    background: deepskyblue;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 150px;
    
    @media (max-width: 576px) {
      font-size: 75px;
    }
  }
  
  @keyframes fadeAndTop {
    0%{
      top: 310px;
      opacity: 0;
    }
    100%{
      top: 0;
      opacity: 1;
    }
  }
`;

const BasicApplication = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const {totals, setting} = game;
    const [addInterval] = useAddInternal();

    // Вывод
    const [output, setOutput] = useState();

    useEffect((i = 1) => {
        addInterval(() => {
            if (i >= setting.count)
                return dispatch(gameChangeStatus('answer'));
            setOutput(totals[i++].exercise);
        }, setting.time * 1000);
        setOutput(totals[0].exercise);
    }, [setting, dispatch, addInterval, totals]);

    return <ApplicationAnzanWrapper>
        <Card>
            {output ?
                <BasicWrapper key={output.number}>
                    <div className="first">
                        <img src={output.url_picture}
                             alt={output.number}/>
                    </div>
                    <div className="second" style={{animationDelay: `${setting.time_card}s`}}>
                        {output.number}
                    </div>
                </BasicWrapper> : null}
        </Card>
    </ApplicationAnzanWrapper>;
};

export default BasicApplication;