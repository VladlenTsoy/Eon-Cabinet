export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at?: string;
    image: string;
    access: 'student' | 'teacher' | 'director-franchise' | 'admin';
    status: 'active' | 'test'
    lang_id?: string
    setting: {
        is_dark: boolean;
        anzanColor?: 'black' | 'red' | 'purple' | 'dark-purple' | 'light-blue' | 'green' | 'yellow',
        tasks?: any[]
    }
    created_at: string;
}