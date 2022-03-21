import React, {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import Container from "./container/Container"
import {useDispatch} from "store/store"
import NotFound from "../../../../../errors/404"
import {
    useLoadingGroups,
    useSelectGroupById
} from "store/group/groupSelectors"
import {fetchGroup} from "store/group/fetchGroup"
import {useChangeConfigPageEffect} from "../../../../../../hooks/use-change-config-page.effect"
import Header from "./header/Header"

export type TabStudentsType = "details" | "homework" | "events"

export interface ParamsProps {
    id: string
}

const Group: React.FC = () => {
    const {id} = useParams<ParamsProps>()
    const group = useSelectGroupById(Number(id))
    const loading = useLoadingGroups()
    const dispatch = useDispatch()
    const [tab, setTab] = useState<TabStudentsType>("details")

    const changeTabHandler = useCallback((val: TabStudentsType) => setTab(val), [])

    useChangeConfigPageEffect({
        title: loading ? "Группа: Загрузка..." : `Группа: ${group?.title || "Недоступна"}`,
        action: "/groups",
        container: true
    })

    useEffect(() => {
        const promise = dispatch(fetchGroup({id: Number(id)}))
        return () => {
            promise.abort()
        }
    }, [dispatch, id])

    if (!group && !loading) return <NotFound />

    return (
        <>
            <Header tab={tab} changeTabHandler={changeTabHandler} />
            <Container tab={tab} />
        </>
    )
}

export default Group
