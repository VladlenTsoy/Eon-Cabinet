import React, {useEffect, useRef} from "react"
import ReactDOM from "react-dom"

interface PortalProps {
    visible: boolean
}

const Portal: React.FC<PortalProps> = ({children, visible}) => {
    const containerRef = useRef<HTMLElement>()
    const initRef = useRef<boolean>(false)

    if (visible && !initRef.current) {
        const modal = document.createElement("div")
        document.body.appendChild(modal)

        initRef.current = true
        containerRef.current = modal
    }

    useEffect(() => {
        return () => {
            containerRef.current?.parentNode?.removeChild(containerRef.current)
        }
    }, [])

    return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null
}

export default Portal
