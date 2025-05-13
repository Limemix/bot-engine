import { Context } from "telegraf";

export interface SessionData {
    inLobby: string | null,
    isInGame: boolean,
    languageCode: string
}

export interface IBotContext extends Context {
    session: SessionData,
}