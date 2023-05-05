export interface UserRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    token: string
}

export interface Role {
    id: number;
    role: string;
}