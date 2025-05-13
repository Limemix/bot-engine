import { Redis as RedisStore } from "@telegraf/session/redis";
import { inject, injectable } from "inversify";
import type { SessionStore } from "telegraf";
import { ConfigService } from "../../config/ConfigService.js";
import ISessionService from "../../interfaces/ISessionService.js";
import { ContainerTypes } from "../../types/ContainerTypes.js";

@injectable()
export class SessionService implements ISessionService {
  private redisStore?: SessionStore<unknown>;

  constructor(
    @inject(ContainerTypes.Config)
    private config: ConfigService
  ) { }

  public init(): void {
    const host = this.config.get("REDIS_HOST") || "localhost";
    const port = Number(this.config.get("REDIS_PORT")) || 6379;
    const url = `redis://${host}:${port}`;

    // вот — единственная строка «магаиии»
    this.redisStore = RedisStore({ url });

    console.log("Using Redis session store at", url);
  }

  public getSessionStore(): SessionStore<any> | undefined {
    if (!this.redisStore) {
      console.warn("Redis store is not initialized!");
    }
    return this.redisStore;
  }
}
