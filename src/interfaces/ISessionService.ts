import { SessionStore } from "telegraf";

export default interface ISessionService {
    getSessionStore(): SessionStore<any> | undefined
    init(): void
}