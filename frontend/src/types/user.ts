export default interface User {
    id: string;
    email: string;
    password: string;
    provider: string;
    phoneNumber: string;
    fullName: string;
    avatar: string;
    gender: Gender
    dateOfBirth: Date;
    role: string;
}

export type Gender = 'Male' | 'Female' | 'Other';