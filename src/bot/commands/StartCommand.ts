import { inject, injectable } from "inversify";
import { Telegraf } from "telegraf";
import { LanguageService } from "../../config/LanguageService.js";
import { IBotCommand } from "../../interfaces/IBotCommand.js";
import { IBotContext } from "../../interfaces/IBotContext.js";
import { IDBService } from "../../interfaces/IDBService.js";
import { ContainerTypes } from "../../types/ContainerTypes.js";


@injectable()
export class StartCommand implements IBotCommand {

  constructor(
    @inject(ContainerTypes.DB) private db: IDBService,
    @inject(ContainerTypes.LanguageService) private ls: LanguageService
  ) { }

  register(bot: Telegraf<IBotContext>): void {
    bot.start(async (ctx) => {
      const tgId = ctx.from?.id
      const lang = ctx.session.languageCode

      console.log(lang)

      if (!tgId) return ctx.reply(this.ls.t("errors.noUserId", lang))

      const existingUser = await this.db.Users.get({
        telegramId: tgId
      })

      if (!existingUser && existingUser === null) {
        await this.db.Users.add({
          telegramId: tgId
        })
        ctx.reply(this.ls.t('start.welcome', lang))
      } else {
        ctx.reply(this.ls.t('start.alreadyRegistered', lang))
      }

    });
  }
}
