export interface Profile {
    id: number;
    userId: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    city: string | null;
    birthDate: string | null;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
}
export interface CreateProfileRequest{
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    birthDate: string;
    bio: string;
}
export interface UpdateProfileRequest{
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    birthDate: string;
    bio: string;
}
