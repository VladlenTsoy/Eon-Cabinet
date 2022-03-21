import {useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {
    changeAction,
    changeStatusContainer,
    changeTitle
} from "store/app/appSlice"

interface ParamsProps {
    title?: string
    action?: string | null
    container: boolean
}

type Props = (params: ParamsProps) => void

export const useChangeConfigPageEffect: Props = ({
    title,
    action,
    container
}) => {
    const [appAction] = useState(action)
    const dispatch = useDispatch()

    useEffect(() => {
        if (title) {
            dispatch(changeTitle(title))

            return () => {
                dispatch(changeTitle("Eon - программа развития интеллекта."))
            }
        }
    }, [title, dispatch])

    useEffect(() => {
        if (typeof appAction !== "undefined") {
            dispatch(changeAction(appAction))
            return () => {
                dispatch(changeAction(null))
            }
        }
    }, [dispatch, appAction])

    useEffect(() => {
        if (container) {
            dispatch(changeStatusContainer(true))
            return () => {
                dispatch(changeStatusContainer(false))
            }
        }
    }, [dispatch, container])
}
