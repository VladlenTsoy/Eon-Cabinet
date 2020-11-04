import React, {useCallback, useEffect, useRef, useState} from "react"
import {DownOutlined} from "@ant-design/icons"
import styled from "./Select.module.css"
import oostyled from "./option/Option.module.css"
import Portal from "../../feedback/modal/portal/Portal"

interface SelectProps {
    allowClear?: boolean
    autoFocus?: boolean
    disabled?: boolean
    defaultValue?: string | number
    placeholder?: string
    onChange?: (value: any, option: any) => void
    onSearch?: (value: string) => void
}

const Select: React.FC<SelectProps> = ({
    allowClear = false,
    autoFocus = false,
    defaultValue,
    placeholder,
    disabled = false,
    onChange,
    onSearch,
    children
}) => {
    const [value, setValue] = useState(defaultValue)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const dropDownRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const [rect, setRect] = useState({width: 0, top: 9999, left: 9999})

    const onClickHandler = () => {
        setVisible(prevState => !prevState)
    }

    const closeHandler = useCallback(
        (e: any) => {
            if (
                !(
                    (wrapperRef.current &&
                        e.target.closest(`.${wrapperRef.current?.className.split(" ").join(".")}`)) ||
                    (dropDownRef.current &&
                        e.target.closest(`.${dropDownRef.current?.className.split(" ").join(".")}`))
                )
            )
                setVisible(false)
        },
        [wrapperRef, dropDownRef]
    )

    const resizeUpdate = useCallback(() => {
        if (wrapperRef.current) {
            const _rect = wrapperRef.current.getBoundingClientRect()
            setRect({
                width: _rect.width,
                top: _rect.top + _rect.height + 3,
                left: _rect.left
            })
        }
    }, [wrapperRef])
    const [i, setI] = useState(-1)

    const keyDownHandler = useCallback(
        (e: any) => {
            if (visible && e.key === "Escape") setVisible(false)
            if (document.activeElement === wrapperRef.current && e.key === "Enter") setVisible(true)
            if (dropDownRef.current) {
                const child = dropDownRef.current.getElementsByTagName("div")
                if (e.key === "ArrowDown")
                    setI(prevState => {
                        if (prevState >= child.length - 1) return 0
                        return prevState + 1
                    })
                else if (e.key === "ArrowUp")
                    setI(prevState => {
                        if (prevState <= 0) return child.length - 1
                        return prevState - 1
                    })
            }
        },
        [visible]
    )

    const onClickOptionHandler = useCallback(
        (value: SelectProps["defaultValue"]) => {
            onChange && onChange(value, [])
            setValue(value)
            setVisible(false)
        },
        [onChange]
    )

    useEffect(() => {
        if (i !== -1) {
            // @ts-ignore
            console.log(children[i]?.props?.value)
            // @ts-ignore
            onClickOptionHandler(children[i]?.props?.value)
        }
    }, [onClickOptionHandler, i, children])

    useEffect(() => {
        resizeUpdate()
        window.addEventListener("resize", resizeUpdate)
        window.addEventListener("click", closeHandler)
        window.addEventListener("keydown", keyDownHandler)
        return () => {
            window.removeEventListener("resize", resizeUpdate)
            window.removeEventListener("click", closeHandler)
            window.removeEventListener("keydown", keyDownHandler)
        }
    }, [resizeUpdate, keyDownHandler, closeHandler])

    return (
        <>
            <div className={styled.select} onClick={onClickHandler} ref={wrapperRef} tabIndex={0}>
                <div className={styled.selector}>
                    <div className={styled.item}>
                        {React.Children.map(children, (child: any) => {
                            if (child.props.value === value) return child
                        })}
                    </div>
                    <div className={styled.icon}>
                        <DownOutlined />
                    </div>
                </div>
            </div>
            <Portal visible={visible}>
                <div
                    ref={dropDownRef}
                    className={`${styled.dropdown} ${visible ? styled.open : styled.close}`}
                    style={{minWidth: rect.width, top: rect.top, left: rect.left}}
                >
                    {React.Children.map(children, (child: any, key) => (
                        <div
                            className={`${oostyled.option} ${
                                child.props.value === value ? oostyled.active : ""
                            } ${key === i ? oostyled.hover : ""}`}
                        >
                            {React.cloneElement(child, {onClick: onClickOptionHandler})}
                        </div>
                    ))}
                </div>
            </Portal>
        </>
    )
}

export default Select
