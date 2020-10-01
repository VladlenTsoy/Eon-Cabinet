import React from "react"
import {Button} from "../../../../../../../lib/ui"
import {PlusOutlined} from "@ant-design/icons"
import EditorButton from "./editor-button/EditorButton"

const TabTopExtra = () => {
    return (
        <>
            <EditorButton title="Создать группу">
                <Button
                    type="warning"
                    block
                    size="large"
                    key="create-group"
                    icon={<PlusOutlined />}
                >
                    Создать группу
                </Button>
            </EditorButton>
        </>
    )
}

export default TabTopExtra
