import axios from "axios";
import { inject, injectable } from "inversify";
import { IConfigService } from "../interfaces/IConfigService.js";
import { IDBService, IUserRepository } from "../interfaces/IDBService.js";
import { ContainerTypes } from "../types/ContainerTypes.js";

@injectable()
export class DBService implements IDBService {
    private config: IConfigService;

    constructor(@inject(ContainerTypes.Config) configService: IConfigService) {
        this.config = configService;
    }

    public Users: IUserRepository = {
        get: async (criteria) => {
            try {
                const query = { ...criteria };

                if (query.telegramId) {
                    query.telegramId = Number(query.telegramId);
                }

                const response = await axios.get(
                    this.config.get("API_GATEWAY") + "users",
                    {
                        params: query,
                        headers: {
                            "x-api-key": this.config.get("X_API_KEY"),
                        },
                    }
                );

                if (!Array.isArray(response.data) || response.data.length === 0)
                    return null;

                return response.data.map(user => ({
                    ...user,
                }));
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        return null;
                    }
                    console.error("Axios error:", error.response?.data || error.message);
                } else {
                    console.error("Unknown error:", error);
                }
                throw error;
            }
        },
        add: async (userData) => {
            const requestBody = {
                ...userData,
                telegramId: Number(userData.telegramId),
            };

            const response = await axios.post(
                this.config.get("API_GATEWAY") + "users",
                requestBody,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": this.config.get("X_API_KEY"),
                    },
                }
            );

            return {
                ...response.data[0]
            };
        },

        update: async () => {
            throw new Error("Method not implemented.");
        },
    };
}
