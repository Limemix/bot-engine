import { Telegraf } from "telegraf";
import { IBotContext } from "./IBotContext.js";

export interface IBotCommand {
  register(bot: Telegraf<IBotContext>): void;
}
