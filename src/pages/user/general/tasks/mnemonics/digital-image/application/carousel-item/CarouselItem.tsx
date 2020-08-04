import React from 'react';
import CardFlip from "../../../../layouts/application/application-output/output-component-layouts/card-flip/CardFlip";

const CarouselItem = ({outputs}:any) => {
    return outputs.map((output: any, key: number) =>
        <div key={key}>
            <CardFlip
                front={
                    <div className="text-fit">
                        {output.number < 10 ? `0${output.number}` : output.number}
                    </div>
                }
                back={
                    <img src={output.url_form} alt={output.number}/>
                }
            />
        </div>
    );
};

export default CarouselItem;