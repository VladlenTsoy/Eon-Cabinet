export interface Group {
    id: number
    title: string
    method_id: number
    category: {
        id: number
        title: string
    }
    students_count: number
    last_homework: {
        created_at: string
    }
    created_at: string
}