import { Container } from "inversify";
import { Bot } from "./bot/Bot.js";
import { HelpCommand } from "./bot/commands/HelpCommand.js";
import { LanguageCommand } from "./bot/commands/LanguageCommand.js";
import { StartCommand } from "./bot/commands/StartCommand.js";
import { ConfigService } from "./config/ConfigService.js";
import { LanguageService } from "./config/LanguageService.js";
import { DBService } from "./db/DBService.js";
import { SessionService } from "./db/session/SessionService.js";
import { IBotCommand } from "./interfaces/IBotCommand.js";
import { IConfigService } from "./interfaces/IConfigService.js";
import { IDBService } from "./interfaces/IDBService.js";
import ISessionService from "./interfaces/ISessionService.js";
import { ContainerTypes } from "./types/ContainerTypes.js";

const container = new Container()

/////// Services ////////

container.bind<IDBService>(ContainerTypes.DB).to(DBService)

container.bind<ISessionService>(ContainerTypes.Session).to(SessionService).inSingletonScope()
container.bind<IConfigService>(ContainerTypes.Config).to(ConfigService).inSingletonScope()

container.bind<LanguageService>(ContainerTypes.LanguageService).to(LanguageService).inSingletonScope()

/////// Bot ////////

container.bind<Bot>(Bot).toSelf()

/////// Commands ////////

container.bind<IBotCommand>(ContainerTypes.BotCommand).to(StartCommand).inSingletonScope()
container.bind<IBotCommand>(ContainerTypes.BotCommand).to(HelpCommand).inSingletonScope()
container.bind<IBotCommand>(ContainerTypes.BotCommand).to(LanguageCommand).inSingletonScope()


export { container };

