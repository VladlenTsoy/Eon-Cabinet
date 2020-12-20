import React, {useState} from "react"
import {Button, Drawer} from "antd"
import Results from "../../../step-details/step-more/students/result-more/result-more-drawer/results/Results"

const ResultsButton = () => {
    const [visible, setVisible] = useState(false)

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <Button onClick={open} style={{marginRight: '8px'}}>Результаты</Button>
            <Drawer
                onClose={close}
                visible={visible}
                width="100%"
                title="Результаты"
            >
                <Results/>
            </Drawer>
        </>
    )
}

export default ResultsButton