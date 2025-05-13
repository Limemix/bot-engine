import { inject, injectable } from "inversify";
import { Markup, Telegraf } from "telegraf";
import { LanguageService } from "../../config/LanguageService.js";
import { IBotCommand } from "../../interfaces/IBotCommand.js";
import { IBotContext } from "../../interfaces/IBotContext.js";
import { ContainerTypes } from "../../types/ContainerTypes.js";

@injectable()
export class LanguageCommand implements IBotCommand {
    constructor(
        @inject(ContainerTypes.LanguageService) private i18n: LanguageService
    ) { }

    register(bot: Telegraf<IBotContext>): void {
        bot.command("language", (ctx) => {
            const current = ctx.session.languageCode;
            const userMsgId = ctx.message?.message_id;

            return ctx.reply(
                this.i18n.t("language.select", current),
                Markup.inlineKeyboard([
                    [
                        Markup.button.callback("🇬🇧 English", `lang:en:${userMsgId}`),
                        Markup.button.callback("🇺🇦 Українська", `lang:uk:${userMsgId}`),
                    ],
                    [
                        Markup.button.callback(this.i18n.t("language.goBack", current), `lang:return:${userMsgId}`),
                    ],
                ])
            );
        });

        bot.action(/lang:(en|uk|return):(\d+)/, async (ctx) => {
            const action = ctx.match[1] as string;
            const userMsgId = Number(ctx.match[2]);

            await ctx.deleteMessage();

            try {
                await ctx.deleteMessage(userMsgId);
            } catch (err) {
                console.error("Failed to delete user message:", err);
            }

            if (action === 'return') {
                return;
            }


            ctx.session.languageCode = action;

            ctx.reply(this.i18n.t("language.changed", action));
        });
    }
}
