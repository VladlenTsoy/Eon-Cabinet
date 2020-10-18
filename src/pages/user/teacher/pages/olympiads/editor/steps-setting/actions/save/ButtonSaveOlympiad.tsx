import React, {useCallback, useState} from "react"
import SaveOlympiadItems from "./items/SaveOlympiadItems"
import {EditOutlined, FlagOutlined} from "@ant-design/icons"
import {Button} from "antd"
import {useScreenWindow} from "../../../../../../../../../hooks/use-screen-window.effect"
import DrawerEditor from "../../../../../../../../../lib/ui/feedback/drawer-editor/DrawerEditor"

interface ButtonSaveOlympiadProps {
    olympiad?: any
    steps?: any
    exercises?: any
    fetch?: () => void
}

const ButtonSaveOlympiad: React.FC<ButtonSaveOlympiadProps> = ({steps, olympiad, fetch, exercises}) => {
    const [visible, setVisible] = useState(false)
    const [, breakpoint] = useScreenWindow({breakpoint: "sm"})

    const open = () => setVisible(true)
    const close = useCallback(() => setVisible(false), [])

    return (
        <>
            {olympiad ? (
                <Button icon={<EditOutlined />} onClick={open}>
                    Изменить
                </Button>
            ) : (
                <Button icon={<FlagOutlined />} block onClick={open}>
                    Завершить
                </Button>
            )}

            <DrawerEditor
                visible={visible}
                close={close}
                title={olympiad ? "Редактировать олимпиаду" : "Сохранить олимпиаду"}
                width={breakpoint ? "100%" : 650}
            >
                <SaveOlympiadItems
                    close={close}
                    fetch={fetch}
                    steps={steps}
                    exercises={exercises}
                    olympiad={olympiad}
                />
            </DrawerEditor>
        </>
    )
}

export default ButtonSaveOlympiad
