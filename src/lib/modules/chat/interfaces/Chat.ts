import {Message} from "./Message"
import {Contact} from "./Contact"

export interface Chat {
    chat_id: number
    contact: Contact
    last_message?: Message
}