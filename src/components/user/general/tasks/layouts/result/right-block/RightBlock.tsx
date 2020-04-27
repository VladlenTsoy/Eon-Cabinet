import React from 'react';
import AgainBlock from "./again-block/AgainBlock";
import RepeatBlock from "./repeat-block/RepeatBlock";

interface RightBlockProps {

}

const RightBlock: React.FC<RightBlockProps> = () => {
    return <>
        <RepeatBlock/>
        <AgainBlock/>
    </>;
};

export default RightBlock;