import { injectable } from "inversify";
import { Telegraf } from "telegraf";
import { IBotCommand } from "../../interfaces/IBotCommand.js";
import { IBotContext } from "../../interfaces/IBotContext.js";

@injectable()
export class HelpCommand implements IBotCommand {
  register(bot: Telegraf<IBotContext>): void {
    bot.command("help", (ctx) => {
      ctx.reply("Могу помочь!");
    });
  }
}
