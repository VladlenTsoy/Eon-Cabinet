export interface Olympiad {
    id: number;
    title: string;
    access: 'public' | 'invite' | 'private';
    current_step: {
        start_at: string;
        step: number;
        end_at: string;
    }
    steps_count: number;
    students_count: number;
    last_step: {
        end_at: string;
    }
}