import {useCallback, useEffect} from "react"
import {nextWeek, prevWeek} from "../../../../../../../store/access/teacher/students/studentsSlice"
import {fetchStudentsHomeworkDates} from "../../../../../../../store/access/teacher/students/homework/fetchStudentsHomeworkDates"
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store"
import {TabStudentsType} from "../Group"

interface ParamsProps {
    id: string
    tab: TabStudentsType
    homework: any
}

interface ReturnProps {
    nextAction: () => void
    prevAction: () => void
}

type Props = (params: ParamsProps) => ReturnProps

export const useHomeworkDates: Props = ({id, tab, homework}) => {
    const dispatch = useTeacherDispatch()

    const nextAction = useCallback(() => dispatch(nextWeek()), [dispatch])
    const prevAction = useCallback(() => dispatch(prevWeek()), [dispatch])

    useEffect(() => {
        let promise: any
        const timeout = setTimeout(() => {
            promise = dispatch(fetchStudentsHomeworkDates({groupId: Number(id)}))
        }, 500)

        return () => {
            clearTimeout(timeout)
            promise && promise.abort()
        }
    }, [homework.weekState, dispatch])

    useEffect(() => {
        let parents = document.querySelectorAll(".td-events-table")

        if (parents) {
            parents.forEach(function (parent) {
                parent.addEventListener("mouseenter", function (event) {
                    // @ts-ignore
                    const div = event.currentTarget.querySelector("div")

                    const a = document.querySelectorAll(`.td-events-table-${div.dataset.key}`)
                    a.forEach(function (value) {
                        // @ts-ignore
                        value.classList.add("selected")
                    })
                })
            })
            // parents.forEach(function (parent) {
            //     parent.addEventListener('click', function (event) {
            //         // @ts-ignore
            //         console.log(event.target.tagName)
            //         // @ts-ignore
            //         const div = event.currentTarget.querySelector('div')
            //         alert(div.dataset.key);
            //     })
            // })
            parents.forEach(function (parent) {
                parent.addEventListener("mouseleave", function (event) {
                    // @ts-ignore
                    const div = event.currentTarget.querySelector("div")

                    const a = document.querySelectorAll(`.td-events-table-${div.dataset.key}`)
                    a.forEach(function (value) {
                        // @ts-ignore
                        value.classList.remove("selected")
                    })
                })
            })
        }
    }, [tab])

    return {nextAction, prevAction}
}
