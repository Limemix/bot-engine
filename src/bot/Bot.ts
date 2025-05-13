import { inject, injectable, multiInject } from "inversify";
import { session, Telegraf } from "telegraf";
import { IBotCommand } from "../interfaces/IBotCommand.js";
import { IBotContext } from "../interfaces/IBotContext.js";
import { IConfigService } from "../interfaces/IConfigService.js";
import ISessionService from "../interfaces/ISessionService.js";
import { ContainerTypes } from "../types/ContainerTypes.js";

@injectable()
export class Bot {
  private bot: Telegraf<IBotContext>;
  private commands: IBotCommand[];
  private configService: IConfigService;

  constructor(
    @multiInject(ContainerTypes.BotCommand) commands: IBotCommand[],
    @inject(ContainerTypes.Config) config: IConfigService,
    @inject(ContainerTypes.Session) sessionService: ISessionService
  ) {
    this.configService = config;
    this.commands = commands;

    this.bot = new Telegraf<IBotContext>(this.configService.get("TELEGRAM_BOT_TOKEN"));

    this.bot.use(session({
      store: sessionService.getSessionStore(),
      defaultSession: (ctx) => ({
        inLobby: null,
        isInGame: false,
        languageCode: ctx.from?.language_code || 'en'
      })

    }));

    this.bot.use((ctx, next) => {
      if (ctx.from && !ctx.session.languageCode) {
        ctx.session.languageCode = ctx.from.language_code || 'en';
      }
      return next();
    });

    this.setupCommands();
  }

  private setupCommands() {
    try {
      this.commands.forEach((command) => command.register(this.bot));
    } catch (error) {
      throw new Error(
        `Failed to set up commands: ${error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  public async launch() {
    try {
      await this.bot.launch();
    } catch (error) {
      throw new Error(
        `Failed to launch the bot: ${error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}
