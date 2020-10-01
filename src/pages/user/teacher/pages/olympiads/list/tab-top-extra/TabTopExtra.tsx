import React from "react"
import {Link} from "react-router-dom"
import {Button} from "../../../../../../../lib/ui"
import {PlusOutlined} from "@ant-design/icons";

const TabTopExtra = () => {
    return (
        <>
            <Link to="/olympiad/create">
                <Button type="warning" icon={<PlusOutlined/>} block size="large">
                    Создать олимпиаду
                </Button>
            </Link>
        </>
    )
}

export default TabTopExtra