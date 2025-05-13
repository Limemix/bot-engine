export interface IUserData {
    id?: number;
    telegramId?: number;
    level?: number;
    experience?: number;
    balance?: number;
    gamesPlayed?: number;
    createdAt?: Date;
}

export interface IUserRepository {
    get: (criteria: Partial<IUserData>) => Promise<IUserData[] | null>;
    add: (userData: Omit<IUserData, 'id' | 'createdAt'>) => Promise<IUserData>;
    update: (criteria: Partial<IUserData>, data: Partial<IUserData>) => Promise<IUserData>;
}

export interface IDBService {
    Users: IUserRepository
}

