import React from 'react';
import styled from "styled-components";

const ExerciseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
  
  .flag{
    width: 250px;
    height: 160px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: .5rem;
    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 576px) {
      width: 160px;
      height: 90px;
    }
  }
  
  .country{
    font-size: 60px;
    font-weight: bold;
    line-height: 1;
    
    @media (max-width: 576px) {
      font-size: 30px;
    }
  }
  .capital{
    font-size: 60px;
    font-weight: bold;
    line-height: 1;
    
    @media (max-width: 576px) {
      font-size: 30px;
    }
  }
  
  .title{
    display: inline-block;
    color: ${props => props.theme.color_primary};
    line-height: 1;
    margin-top: 1.25rem;
    font-size: 16px;
  }
  
  .content{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  
    .solo{
      grid-column-start: 1;
      grid-column-end: 3;
    }
    
    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }
`;

const CarouselItem = ({outputs, setting}: any) => {
    return outputs.map((output: any, key: number) =>
        <div key={key}
        >
            <ExerciseWrapper>
                <div className="flag">
                    <img src={output.url_flag} alt={output.country}/>
                </div>
                <div className="content">
                    <div className={Number(setting.mode) === 1 ? 'solo' : ''}>
                        <span className="title">Страна</span>
                        <div className="country">
                            {output.country}
                        </div>
                    </div>
                    {Number(setting.mode) === 2 ?
                        <div>
                            <span className="title">Столица</span>
                            <div className="capital">
                                {output.capital}
                            </div>
                        </div> : null}
                </div>
            </ExerciseWrapper>
        </div>
    );
};

export default CarouselItem;