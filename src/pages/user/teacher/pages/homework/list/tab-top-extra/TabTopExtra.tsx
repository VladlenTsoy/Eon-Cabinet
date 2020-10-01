import React from "react"
import {Link} from "react-router-dom"
import {Button} from "../../../../../../../lib/ui"
import {PlusOutlined, AppstoreOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux"
import {disciplineSelector} from "../../../../../../../store/access/teacher/discipline/disciplineSlice"

const TabTopExtra = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);

    return (
        <>
            <Link to="/homework/create">
                <Button type="warning" size="large" icon={<PlusOutlined/>} block>
                    Создать д.з.
                </Button>
            </Link>
            {
                activeDisciplineId === 1 &&
                <Link to="/settings/custom-exercises">
                    <Button type="warning" size="large" icon={<AppstoreOutlined/>} block>
                        Свои примеры
                    </Button>
                </Link>
            }
        </>
    )
}

export default TabTopExtra