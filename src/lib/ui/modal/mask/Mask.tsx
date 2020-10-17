import React, {useEffect, useRef} from "react"
import style from "./Mask.module.css"

interface MaskProps {
    maskClosable?: boolean
    visible: boolean
    centered?: boolean
    closeHandler: () => Promise<void>
}

const Mask: React.FC<MaskProps> = ({children, maskClosable = true, visible, centered, closeHandler}) => {
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
                wrapperRef.current.style.display = "flex"
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
    }, [wrapperRef.current, visible])

    return (
        <div
            onClick={clickHandler}
            tabIndex={-1}
            role="dialog"
            onKeyDown={onWrapperKeyDown}
            className={`${visible ? style.open : style.close} ${style.mask} ${
                centered ? style.maskCenter : style.maskTop
            }`}
            ref={wrapperRef}
        >
            {children}
        </div>
    )
}

export default Mask
