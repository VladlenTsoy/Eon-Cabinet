import React, {useEffect, useRef} from "react"
import {CloseOutlined} from "@ant-design/icons"
import style from "./Modal.module.css"
import ReactDOM from "react-dom"
import Mask from "./mask/Mask"

// interface _ModalProps {
//     title: string
//     width: string
//     visible: boolean
//     centered?: boolean
//     onCancel: () => void
// }

const _Modal: React.FC<any> = ({children, title, centered, width, visible, onCancel}) => {
    const containerRef = useRef<HTMLElement>()
    const initRef = useRef<boolean>(false)

    if (visible && !initRef.current) {
        const modal = document.createElement("div")
        document.body.appendChild(modal)

        initRef.current = true
        containerRef.current = modal
    }

    const closeHandler = async () => {
        onCancel()
    }

    useEffect(() => {
        return () => {
            // [Legacy] This should not be handle by Portal but parent PortalWrapper instead.
            // Since some component use `Portal` directly, we have to keep the logic here.
            containerRef.current?.parentNode?.removeChild(containerRef.current)
        }
    }, [])

    return containerRef.current
        ? ReactDOM.createPortal(
              <Mask closeHandler={closeHandler} centered={centered} visible={visible}>
                  <div className={style.modal} role="document" style={{maxWidth: width}}>
                      <button className={style.btnClose}>
                          <span className={style.iconClose}>
                              <CloseOutlined />
                          </span>
                      </button>
                      <div className={style.header}>
                          <div className={style.title}>{title}</div>
                      </div>
                      <div className={style.container}>{children}</div>
                  </div>
              </Mask>,
              containerRef.current
          )
        : null
}

export default _Modal
