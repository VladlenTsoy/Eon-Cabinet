import {Discipline} from "../common/Discipline"
import {Task} from "./Task"

export interface Homework {
    id: number;
    level: number;
    description: string;
    discipline_id: number;
    category_id: number;
    created_at: string;
    // tasks?: Exercise[]
}

export interface Exercise {
    id: number
    homework_id: number
    count_all: number
    settings: any
    task: {
        id: Task['id']
        title: Task['title']
        discipline_id: Discipline['id']
    }
    // task_id: number
    // task_name: string
    created_at: string
    updated_at: string
}