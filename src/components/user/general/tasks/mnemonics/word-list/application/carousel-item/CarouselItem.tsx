import React from 'react';
import styled from "styled-components";
import TextFit
    from "../../../../../../teacher/training/settings/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";

const ExerciseWrapper = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const TextFitWrapper = styled.div`
  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const CarouselItem:React.FunctionComponentFactory<any> = ({outputs}) => {
    return outputs.map((output: any, key: number) =>
        <TextFitWrapper key={key}>
            <TextFit>
                <ExerciseWrapper>
                    {output}
                </ExerciseWrapper>
            </TextFit>
        </TextFitWrapper>
    );
};

export default CarouselItem;