import React from 'react';
import styled from "styled-components";
import TextFontSet from "./TextFontSet";

const OutputWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  white-space: nowrap;
  font-weight: 600;
`;

interface OutputProps {
    isMultiplication?: boolean;
    output: any;
    setting?: any;
    keyTask: number;
}

const Output: React.FC<OutputProps> = (
    {
        output,
        keyTask,
    }
) => {
    return <OutputWrapper>
        <TextFontSet
            key={output}
            keyTask={keyTask}
            text={output}
        />
    </OutputWrapper>
};

export default Output;