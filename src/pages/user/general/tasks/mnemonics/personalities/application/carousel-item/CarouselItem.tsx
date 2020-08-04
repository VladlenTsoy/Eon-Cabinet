import React from 'react';
import {Avatar} from "../../../../../../../../lib/components";
import moment from "moment";
import styled from "styled-components";

const ExerciseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-direction: column;
  
  > .image{
    margin-bottom: 1.5rem;
  }
  
  > .name{
    font-size: 55px;
    line-height: 1;
    font-weight: bold;
    color: ${props => props.theme.color_black};
    
    @media (max-width: 576px) {
      font-size: 30px;
    }
  }
  
  > .dates{
    display: flex;
    font-size: 30px;
    font-weight: bold;

    @media (max-width: 576px) {
      font-size: 20px;
    }
    
    .slash{
      margin: 0 1rem;
      color: ${props => props.theme.color_second}
    }
  }
`;

interface CarouselProps {
    outputs: any[];
    setting: any;
    isBreakpoint?: boolean;
}

const CarouselItem: any = ({outputs, setting, isBreakpoint = false}: CarouselProps) => {
    return outputs.map((output: any, key: number) =>
        <div key={key}>
            <ExerciseWrapper>
                <Avatar
                    width={isBreakpoint ? '150px' : '200px'}
                    className="image"
                    src={output.url_photo}
                    alt={output.full_name}
                />
                {
                    Number(setting.mode) > 1 &&
                    <div className="dates">
                        <div>{moment(output.born).format('DD-MM-YYYY')}</div>
                        {Number(setting.mode) === 3 ?
                            <>
                                <div className="slash">-</div>
                                <div>{moment(output.die).format('DD-MM-YYYY')}</div>
                            </> : null
                        }
                    </div>
                }
                <div className="name">{output.full_name}</div>
            </ExerciseWrapper>
        </div>
    );
};

export default CarouselItem;