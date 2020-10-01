import React from "react"
import EditorButton from "./editor-button/EditorButton"

const NavButtons: React.FC = () => {
    return <EditorButton title="Создать ученика">Создать ученика</EditorButton>
}

export default React.memo(NavButtons)
