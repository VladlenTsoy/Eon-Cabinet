import React, {useState} from "react"
import {Popover} from "antd"
import {Drawer} from "../../../../../../../../../../lib"
import ResultMoreDrawer from "./result-more-drawer/ResultMoreDrawer"

interface ResultMoreProps {
    numbers: any,
    student: any
    stepId: any
}

const ResultMore: React.FC<ResultMoreProps> = ({numbers, stepId, student}) => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return <>
        <Popover
            title="Упражнений"
            content={`Побед: ${numbers.success} / Выполнил: ${numbers.done} / Всего: ${numbers.all}`}
        >
            <div
                onClick={open}
                className={numbers.success === numbers.all ? "numbers numbers-success" : "numbers"}
            >
                <span className="count-success">{numbers.success}</span>
                <span className="count-all"> / {numbers.done}</span>
                <span className="count-all"> / {numbers.all}</span>
            </div>
        </Popover>
        <Drawer
            visible={visible}
            width="100%"
            onClose={close}
        >
            <ResultMoreDrawer student={student} stepId={stepId}/>
        </Drawer>
    </>
}

export default ResultMore