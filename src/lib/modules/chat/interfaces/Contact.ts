import {Message} from "./Message"

export interface Contact {
    id: number
    first_name: string
    last_name: string
    image: string
    messages?: {
        last: Message,
        not_read: number
    }
}