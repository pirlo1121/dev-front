export interface IProjectResponse {
    _id: string;
    name: string;
    description: string;
    image: string;
    repository: string;
    stack: string[];
    deploy?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectsResponse {
    ok: boolean;
    projects: IProjectResponse[];
}

export interface ProjectResponse {
    ok: boolean;
    project: IProjectResponse;
}

export interface ProjectMessageResponse {
    ok: boolean;
    msg: string;
}
