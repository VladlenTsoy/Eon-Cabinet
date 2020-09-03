import {Contact} from "./Contact"
import {User} from "../../../types/common/User"

export interface Message {
    id: string
    user_id: User["id"]
    contact_id: Contact["id"]
    message: string
    created_at: number
    // created_at: {
    //     seconds: number
    //     nanoseconds: number
    // }
}