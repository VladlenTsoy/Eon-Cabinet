import {Contact} from "./Contact"
import {User} from "../../../types/common/User"

export interface Message {
    id: number
    type: "outbox" | "inbox"
    user_id: User['id']
    contact_id: Contact['profile']['id']
    message: string
    created_at: {
        seconds: number
        nanoseconds: number
    }
}