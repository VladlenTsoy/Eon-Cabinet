import {Message} from "./Message"
import {User} from "../../../types/common/User"

export interface Contact {
    chat_id: number
    contact: {
        id: number
        first_name: string
        last_name: string
        image: string
        access: User["access"]
        group?: {
            id: number
            title: string
        }
    }
    last_message?: Message
    not_read: number
}