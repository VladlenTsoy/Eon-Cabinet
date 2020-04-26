import React from 'react';
import CardFlip from "../../../../layouts/application/_old/card-flip/CardFlip";

const Carousel = ({outputs}:any) => {
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

export default Carousel;