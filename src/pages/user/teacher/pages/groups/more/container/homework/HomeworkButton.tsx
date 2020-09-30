import React, {useState} from "react"
import {Drawer} from "../../../../../../../../lib/ui"
import Homework from "./Homework"
import {UnorderedListOutlined} from "@ant-design/icons"

interface HomeworkButtonProps {
    studentId: number
}

const HomeworkButton: React.FC<HomeworkButtonProps> = ({studentId}) => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <div onClick={open}>
                <UnorderedListOutlined /> Домашние задания
            </div>
            <Drawer visible={visible} onClose={close} width="100%">
                <Homework id={studentId} />
            </Drawer>
        </>
    )
}

export default HomeworkButton
