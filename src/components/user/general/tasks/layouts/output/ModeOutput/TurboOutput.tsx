import React from 'react';
import styled from "styled-components";

const TurboOutputWrapper: any = styled.div<any>`
    height: 100%;
    width: 100%;
    position: relative;

    .text-output {
      width: auto;
      position: absolute;
      font-size: ${(props: any) => `${props.size}px`};
      line-height: 150px;
    }
`;

interface TurboOutputProps {
    output: string;
    setting: any;
}

const TurboOutput: React.FC<TurboOutputProps> = ({output, setting}) => {
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    // Get Font Size and Width output
    const getFSandWidth = () => {
        if (isMultiplication) {
            let pixelInWidth = 1.1;
            let size = 150 - 7.27 * (Number(setting.length) + Number(setting.type === 'o' ? String(setting.theme).length : (setting.type)));
            return {
                size: size,
                width: pixelInWidth * size
            };
        } else {
            let pixelInWidth = 0.58;
            let size = 200 - 12.5 * Number(setting.length);
            return {
                size: size,
                width: pixelInWidth * size
            };
        }
    };

    const bWSelect = (): number => {
        let paddingPx = 179 - 116;
        if (isMultiplication)
            return paddingPx + getFSandWidth().width * (Number(setting.length) + Number(setting.type));
        else
            return paddingPx + getFSandWidth().width * Number(setting.length);
    };

    const wH = window.innerHeight, wW = window.innerWidth,
        bH = 300, bW = bWSelect(),
        p = {x: random(0, (wW - bW)), y: random(0, (wH - bH)),};

    return <TurboOutputWrapper size={getFSandWidth().size}>
        <div className="text-output" style={{
            top: `${p.y}px`,
            left: `${p.x}px`,
        }}>
            {output}
        </div>
    </TurboOutputWrapper>;
};

export default TurboOutput;