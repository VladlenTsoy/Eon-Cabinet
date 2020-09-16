import React from "react"
import {useScreenWindow} from "../../../../hooks/use-screen-window.effect"
import styled from "styled-components"
import {Drawer} from "../../../ui"
import Help from "./Help"

const HelpDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

interface HelpButtonProps {
    visible: boolean
    close: () => void
}

const HelpButton: React.FC<HelpButtonProps> = ({children, close, visible}) => {
    const [, breakpoint] = useScreenWindow({breakpoint: "sm"})

    return (
        <>
            {children}
            <HelpDrawStyled
                width={breakpoint ? "100%" : 480}
                getContainer=".draw-container"
                style={{position: "absolute"}}
                closable={false}
                mask={false}
                visible={visible}
                onClose={close}
                zIndex={3}
                notFooter
            >
                <Help/>
            </HelpDrawStyled>
        </>
    )
}

export default HelpButton
