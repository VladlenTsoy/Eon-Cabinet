import React, {useEffect, useRef} from "react"
import styled from "./Wrapper.module.css"

interface WrapperProps {
    maskClosable?: boolean
    visible: boolean
    centered?: boolean
    zIndex?: number
    closeHandler: () => Promise<void>
    style?: any
}

const Wrapper: React.FC<WrapperProps> = ({
    closeHandler,
    visible,
    maskClosable = true,
    centered,
    style,
    children,
    zIndex = 999
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const onWrapperKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            e.stopPropagation()
            await closeHandler()
            return
        }
    }

    const clickHandler = async (e: any) => {
        if (e.currentTarget === e.target && maskClosable) await closeHandler()
    }

    useEffect(() => {
        if (wrapperRef.current) {
            if (visible) {
                wrapperRef.current.style.display = "block"
                wrapperRef.current.focus()
            } else {
                let timeout = setTimeout(() => {
                    if (wrapperRef.current) wrapperRef.current.style.display = "none"
                }, 300)

                return () => {
                    clearTimeout(timeout)
                }
            }
        }
    }, [wrapperRef, visible, centered])

    return (
        <div
            onClick={clickHandler}
            tabIndex={-1}
            role="dialog"
            onKeyDown={onWrapperKeyDown}
            ref={wrapperRef}
            style={{...style, zIndex}}
            className={`${styled.wrapper} ${centered ? styled.center : styled.top}`}
        >
            {children}
        </div>
    )
}

export default Wrapper
