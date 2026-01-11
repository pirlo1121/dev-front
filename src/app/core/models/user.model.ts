export interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    [key: string]: string | undefined;
}


export interface IUser {
    _id: string;
    name: string;
    age: number;
    profession: string;
    email: string;
    role: 'user' | 'admin';
    languages: string[];
    skills: string[];
    bio?: string;
    avatar?: string;
    image?: string;
    socialLinks?: SocialLinks;
    createdAt: string;
    updatedAt: string;
}

export interface IUserResponse {
    ok: boolean;
    user: IUser;
}