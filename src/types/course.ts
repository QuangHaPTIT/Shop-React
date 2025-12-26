export type Status = 'active' | 'inactive' | 'pedding';

export interface Course {
    id: string;
    name: string;
    instructor: string;
    description: string;
    students: number;
    status: Status;
    price: number;
    createdAt: string;
    updatedAt: string;
}

