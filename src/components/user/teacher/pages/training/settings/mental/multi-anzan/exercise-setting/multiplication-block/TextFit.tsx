import React from 'react';
// @ts-ignore
import { Textfit } from 'react-textfit';

// import React, {useCallback, useEffect, useRef, useState} from 'react';
// import { LoadingOutlined } from '@ant-design/icons';
// import { Spin } from "antd";
// import styled from "styled-components";
//
// const SpinWrapper = styled(Spin)`
//   background: ${props => props.theme['@component-background']};
//   height: 50px;
//   margin-bottom: 0.5rem;
//   border-radius: 10px;
//   display: block;
// `;
//
interface TextFitProps {
    mode?: string;
    widthOnly?: boolean;
    isLoading?: boolean;
    minFontSize?: number;
    maxFontSize?: number;
}
//
// const TextFit: React.FC<TextFitProps> = (
//     {
//         children,
//         widthOnly,
//         minFontSize = 6,
//         maxFontSize = 200,
//         isLoading = false,
//     }
// ) => {
//     const [loading, setLoading] = useState(isLoading);
//     const fit = useRef<HTMLElement>();
//
//     /**
//      *
//      *
//      * @param el
//      */
//     const innerPadding = useCallback((el: HTMLElement) => {
//         return window.getComputedStyle(el, null);
//     }, []);
//
//     /**
//      *
//      *
//      * @param el
//      */
//     const paddingLeftAndRight = useCallback((el: HTMLElement) => {
//         return parseInt(innerPadding(el).getPropertyValue('padding-left'), 10) +
//             parseInt(innerPadding(el).getPropertyValue('padding-right'), 10)
//     }, [innerPadding]);
//
//     /**
//      * Calculate height without padding.
//      *
//      * @param el
//      */
//     const innerHeight = useCallback((el: HTMLElement) => {
//         return el.clientHeight -
//             parseInt(innerPadding(el).getPropertyValue('padding-top'), 10) -
//             parseInt(innerPadding(el).getPropertyValue('padding-bottom'), 10);
//     }, [innerPadding]);
//
//     /**
//      * Calculate width without padding.
//      *
//      * @param el
//      */
//     const innerWidth = useCallback((el: HTMLElement) => {
//         return el.clientWidth - paddingLeftAndRight(el) - 20;
//     }, [paddingLeftAndRight]);
//
//
//     const _onBodyResize = useCallback(async () => {
//         if (isLoading)
//             await setLoading(true);
//
//         if (!fit.current) return;
//
//         const originalWidth = innerWidth(fit.current);
//         const originalHeight = innerHeight(fit.current);
//         const leftAndRight = paddingLeftAndRight(fit.current) + 20;
//
//         let mid;
//         let low = minFontSize;
//         let high = maxFontSize;
//
//         while (low <= high) {
//             mid = (high + low) >> 1;
//             fit.current.style.fontSize = mid + 'px';
//             if ((fit.current.scrollWidth - leftAndRight) <= originalWidth && (widthOnly || fit.current.scrollHeight <= originalHeight)) {
//                 low = mid + 1;
//             } else {
//                 high = mid - 1;
//             }
//         }
//         if (isLoading)
//             await setLoading(false);
//     }, [fit, innerWidth, innerHeight, widthOnly, paddingLeftAndRight, maxFontSize, minFontSize, isLoading]);
//
//     useEffect(() => {
//         _onBodyResize();
//         window.addEventListener("resize", _onBodyResize);
//         window.addEventListener("change-exercise", _onBodyResize);
//         return () => {
//             window.removeEventListener("resize", _onBodyResize);
//             window.removeEventListener("change-exercise", _onBodyResize);
//         };
//     }, [_onBodyResize]);
//
//     /**
//      *
//      * @private
//      */
//     const _renderChildren = () => {
//         return React.Children.map(children, function (child: any) {
//                 return React.cloneElement(child, {
//                     ref: (c: any) => {
//                         return fit.current = c;
//                     }
//                 });
//             }
//         )
//     };
//
//     return (
//         <SpinWrapper spinning={loading} indicator={<LoadingOutlined />}>
//             {_renderChildren()[0]}
//         </SpinWrapper>
//     );
// };
//
// export default (TextFit);

const TextFit:React.FC<TextFitProps> = (
    {
        mode="single",
        children,
        widthOnly,
        minFontSize = 6,
        maxFontSize = 200,
    }
) => {
    return <Textfit mode={mode} forceSingleModeWidth={widthOnly} min={minFontSize} max={maxFontSize}>
        {children}
    </Textfit>;
};

export default TextFit;