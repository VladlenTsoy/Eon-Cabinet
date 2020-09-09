import {Chat} from "./Chat"
import {User} from "../../../types/common/User"

export interface Message {
    id: number
    user_id: User["id"]
    chat_id: Chat["chat_id"]
    message: string
    status: 'new' | 'view' | 'loading' | 'error'
    created_at: string
}