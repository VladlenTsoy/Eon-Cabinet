export interface Task {
    id: number;
    title:string;
    image: string;
    discipline_id: number;
    block: number | null;
    homework: number| null;
}
