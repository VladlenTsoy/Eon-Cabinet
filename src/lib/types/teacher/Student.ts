export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string | null;
    login: string | null;
    date_of_birth: string | object | null;
    group_id: number;
    image: string;
    is_blocked: boolean;
    day_block: number | null;
    day_unblock: number | null;
    coins: number;
}