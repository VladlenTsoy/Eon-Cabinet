import React from "react"
import {PlusOutlined} from "@ant-design/icons"
import {Navigation, NavigationButton} from "lib/ui"
import EditorButton from "./editor-button/EditorButton"

const NavButtons: React.FC = () => {
    return (
        <Navigation>
            <EditorButton title="Создать ученика">
                <NavigationButton type="primary" icon={<PlusOutlined />}>
                    Создать ученика
                </NavigationButton>
            </EditorButton>
        </Navigation>
    )
}

export default React.memo(NavButtons)
