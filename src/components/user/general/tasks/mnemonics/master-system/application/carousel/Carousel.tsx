import React from 'react';
import CardFlip from "../../../../layouts/application/_old/card-flip/CardFlip";
import TextFit
    from "../../../../../../teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";

const Carousel = ({outputs}: any) => {
    return outputs.map((output: any, key: number) =>
        <div key={key}>
            <CardFlip
                isMasterSystem
                front={
                    <div className="text-fit">
                        {output.number < 10 ? `0${output.number}` : output.number}
                    </div>
                }
                back={
                    <TextFit isLoading>
                        <div className="text-fit">
                            {output.word}
                        </div>
                    </TextFit>
                }
            />
        </div>
    );
};

export default Carousel;