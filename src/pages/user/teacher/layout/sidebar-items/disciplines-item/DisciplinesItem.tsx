import React from "react"
import {Dropdown, Menu} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {disciplineSelector, changeActiveDisciplineId} from "store/access/teacher/discipline/disciplineSlice"
import {resetGroupSlice} from "store/access/teacher/group/groupSlice"
import {resetStudentSlice} from "store/access/teacher/students/studentsSlice"
import {resetTasksSlice} from "store/access/teacher/tasks/tasksSlice"
import {resetHomeworkSlice} from "store/access/teacher/homework/homeworkSlice"
import {resetCategorySlice} from "store/access/teacher/category/categorySlice"
import {FaBrain} from "react-icons/fa"
import {CalculatorOutlined} from "@ant-design/icons"
import {SidebarButton} from "../../../../../../lib/layouts/facebook/header/sidebars/sidebar-button/SidebarButton"
import {AccountItem} from "../../../../../../lib/layouts/dashboard/header/laptop/account-menu/AccountMenu"

const DisciplinesItem = () => {
    const {disciplines, activeDisciplineId} = useSelector(disciplineSelector)
    const dispatch = useDispatch()

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
                    {discipline.title}
                </AccountItem>
            )}
        </Menu>
    )

    return <div>
        <Dropdown
            // onVisibleChange={toggle}
            overlay={menu}
            arrow
        >
            <SidebarButton active={false}>
                {activeDisciplineId === 1 ? <CalculatorOutlined/> : <FaBrain/>}
            </SidebarButton>
        </Dropdown>
    </div>
}

export default React.memo(DisciplinesItem)