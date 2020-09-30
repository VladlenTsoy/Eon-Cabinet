import React from "react";
import Basic from "./basic/Basic";
import Double from "./double/Double";

interface AdditionProps {
    totals: any;
    setting: any;
}

const Anzan: React.FC<AdditionProps> = ({totals, setting}) => {
    return setting?.anzan && setting.anzan === 'double' ?
        <Double totals={totals} setting={setting}/> :
        <Basic totals={totals} setting={setting}/>
};

export default Anzan;