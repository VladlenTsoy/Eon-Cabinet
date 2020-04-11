import React from 'react';
import styled from "styled-components";

const MultiGridLayoutWrapper: any = styled.div`
  position: relative;
  height: ${(props: any) => props.height};
  display: grid;
  grid-template-columns: ${(props: any) => props.columns};
  grid-template-rows: ${(props: any) => props.rows};
  grid-gap: ${(props: any) => props.gridGap + props.gridGapType};
  width: 100%;
  background: ${(props: any) => props.theme[props.background]};
    
  >div{
    background: ${props => props.theme['@component-background']};
  }
`;

interface MultiGridProps {
    length: number;
    background?: string;
    height?: string;
    gridGap?: number;
    gridGapType?: string;
}

const MultiGridLayout: React.FC<MultiGridProps> = (
    {
        children,
        length,
        background = 'initial',
        height = '100%',
        gridGap = 1,
        gridGapType = 'rem',
    }
) => {
    const columnsTemplate =
        length > 6 ? `repeat(4, calc((100% - ${gridGap * 3}${gridGapType}) / 4))` :
            length > 4 ? `repeat(3, calc((100% - ${gridGap * 2}${gridGapType}) / 3))` :
                `repeat(2, calc((100% - ${gridGap}${gridGapType}) / 2))`;

    const rowsTemplate =
        length > 2 ? '1fr 1fr' : '1fr';

    return <MultiGridLayoutWrapper
        rows={rowsTemplate}
        columns={columnsTemplate}
        background={background}
        gridGap={gridGap}
        gridGapType={gridGapType}
        height={height}
    >
        {children}
    </MultiGridLayoutWrapper>;
};

export default MultiGridLayout;