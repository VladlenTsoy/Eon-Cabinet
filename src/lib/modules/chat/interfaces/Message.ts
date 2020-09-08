import {Chat} from "./Chat"
import {User} from "../../../types/common/User"

export interface Message {
    id: string
    user_id: User["id"]
    chat_id: Chat["chat_id"]
    message: string
    status: 'new' | 'view'
    created_at: string
}