import {Message} from "./Message"

export interface Contact {
    profile: {
        id: number
        first_name: string
        last_name: string
        image: string
    }
    messages?: {
        last: Message,
        not_read: number
    }
}