export interface Category {
    id: number
    title: string
    active: boolean
    discipline_id: number
    franchise_id: number | null
    center_id: number | null
    created_at: string
    updated_at: string
}