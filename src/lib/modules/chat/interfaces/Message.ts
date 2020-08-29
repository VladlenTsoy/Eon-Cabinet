import {Contact} from "./Contact"

export interface Message {
    id: number
    type: "outbox" | "inbox"
    contact_id: Contact['profile']['id']
    message: string
    created_at: string
}