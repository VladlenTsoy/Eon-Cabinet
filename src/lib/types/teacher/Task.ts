export interface Task {
    id: number;
    title:string;
    url_image: string;
    discipline_id: number;
    block: number | null;
    homework: number| null;
}
