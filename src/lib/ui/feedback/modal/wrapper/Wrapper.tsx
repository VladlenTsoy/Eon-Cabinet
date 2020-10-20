import React, {useEffect, useRef} from "react"
import style from "./Wrapper.module.css"

interface WrapperProps {
    maskClosable?: boolean
    visible: boolean
    centered?: boolean
    zIndex?: number
    closeHandler: () => Promise<void>
}

const Wrapper: React.FC<WrapperProps> = ({
    closeHandler,
    visible,
    maskClosable,
    centered,
    children,
    zIndex = 1000
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
            style={{zIndex}}
            className={`${style.wrapper} ${centered ? style.center : style.top}`}
        >
            {children}
        </div>
    )
}

export default Wrapper
