export interface NoteCreate {
    title: string;
    description: string;
    userName?: string;
}


export interface Note {
    id: number;
    title: string;
    description: string;
    userId: number;
    userName: string;
}
