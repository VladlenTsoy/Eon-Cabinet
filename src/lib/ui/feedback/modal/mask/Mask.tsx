import React, {useEffect, useState} from "react"
import style from "./Mask.module.css"

interface MaskProps {
    visible: boolean
}

const Mask: React.FC<MaskProps> = ({visible}) => {
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        // const root = document.getElementById("root")
        if (!visible) {
            const timeout = setTimeout(() => {
                setHidden(true)
            }, 300)

            // if (root) root.style.filter = "blur(0px)"
            return () => {
                clearTimeout(timeout)
            }
        } else {
            // if (root) root.style.filter = "blur(5px)"
            setHidden(false)
        }
    }, [visible])

    if (hidden) return null

    return <div className={`${visible ? style.open : style.close} ${style.mask}`} />
}

export default React.memo<React.FC<MaskProps>>(Mask)
