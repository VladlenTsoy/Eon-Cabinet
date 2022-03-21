import React, {useState} from "react"
import {Dropdown, Menu} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {disciplineSelector, changeActiveDisciplineId} from "store/discipline/disciplineSlice"
import {resetGroupSlice} from "store/group/groupSlice"
import {resetStudentSlice} from "store/students/studentsSlice"
import {resetTasksSlice} from "store/tasks/tasksSlice"
import {resetHomeworkSlice} from "store/homework/homeworkSlice"
import {resetCategorySlice} from "store/category/categorySlice"
import {FaBrain} from "react-icons/fa"
import {CalculatorOutlined} from "@ant-design/icons"
import {SidebarButton} from "../../../../../../lib/layouts/facebook/header/sidebars/sidebar-button/SidebarButton"
import {AccountItem} from "../../../../../../lib/layouts/facebook/header/sidebars/account-menu/AccountItem"
import {useLanguage} from "../../../../../../hooks/use-language"

const DisciplinesItem = () => {
    const {l} = useLanguage()
    const [active, setActive] = useState(false)
    const {disciplines, activeDisciplineId} = useSelector(disciplineSelector)
    const dispatch = useDispatch()

    const toggle = (active: boolean) => setActive(active)

    const handleChange = (disciplineId: number) => {
        dispatch(resetCategorySlice())
        dispatch(resetHomeworkSlice())
        dispatch(resetGroupSlice())
        dispatch(resetStudentSlice())
        dispatch(resetTasksSlice())
        dispatch(changeActiveDisciplineId(disciplineId))
    }

    const menu = (
        <Menu defaultSelectedKeys={[`${activeDisciplineId}`]}>
            {disciplines.map((discipline) =>
                <AccountItem key={discipline.id} onClick={() => handleChange(discipline.id)}>
                    {discipline.id === 1 && <CalculatorOutlined/>}
                    {discipline.id === 2 && <span className="ricon"><FaBrain/></span>}
                    {l('methods')[discipline.title]}
                </AccountItem>
            )}
        </Menu>
    )

    return <div>
        <Dropdown
            onVisibleChange={toggle}
            overlay={menu}
            arrow
        >
            <SidebarButton active={active}>
                {activeDisciplineId === 1 ? <CalculatorOutlined/> : <FaBrain/>}
            </SidebarButton>
        </Dropdown>
    </div>
}

export default React.memo(DisciplinesItem)
