import {useCallback, useEffect, useState} from "react"
import {firestore} from "../../../../bin/firebase"
import {Message} from "../interfaces/Message"

interface ParamsProps {
    selectedContactId: number
    userId: number,
}

type UseSelectMessages = (params: ParamsProps) => [boolean, Message[], () => void]

export const useSelectMessages: UseSelectMessages = ({selectedContactId, userId}) => {
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState<Message[]>([])
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setLoading(true)

        const unsubscribe = firestore.collection("messages")
            .where("user_id", "==", userId)
            .where("contact_id", "==", selectedContactId)
            .orderBy("created_at", "desc")
            .limit(page * 25)
            .onSnapshot((querySnapshot) => {
                setMessages(
                    querySnapshot.docs
                        .map(
                            (doc): Message =>
                                ({
                                    id: doc.id,
                                    ...doc.data(),
                                    created_at: doc.data().created_at.seconds
                                } as Message)
                        )
                        .reverse()
                )
                setLoading(false)
            })
        return () => {
            unsubscribe()
        }
    }, [selectedContactId, page, userId])

    const addPage = useCallback(() => setPage(prevState => ++prevState), [])

    return [loading, messages, addPage]
}