import {User} from "../../../types/common/User"

export interface Contact {
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