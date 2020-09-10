import {useEffect, useState} from "react"
import socket from "../../../../utils/socket"
import {useUser} from "../../../../hooks/use-user"

type HookType = () => number

export const useChatListeningNotificationCount: HookType = () => {
    const {userId} = useUser()
    const [count, setCount] = useState(0)

    useEffect(() => {
        socket.emit('chat_check_notification_count', {userId: userId})
        socket.on(`chat_receive_notification_count_${userId}`, (count: number) => {
            setCount(count)
        })

        return () => {
            socket.removeListener(`chat_receive_notification_count_${userId}`)
        }
    }, [userId])

    return count
}