import {Homework} from "./Homework"
import {Task} from "./Task"

export interface StudentSentHomeworkTask {
    homework_id: Homework['id']
    task: {
        id: Task["id"]
        title: Task["title"]
    }
    first: {
        count_success: number;
        exodus: boolean;
        view: number;
        created_at: number;
    }
    second?: {
        count_success: number;
        exodus: boolean;
        view: number;
        created_at: number;
    }
    count_all: number;
    created_at: string;
}

export interface StudentSentHomework {
    id: number;
    homework: {
        id: Homework["id"]
        level: number
    }
    count_all: number
    count_success: number
    status: number;
    // tasks: StudentSentHomeworkTask[];
    user_id: number;
    created_at: string;
}