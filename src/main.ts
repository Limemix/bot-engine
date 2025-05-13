import "reflect-metadata";
import { Bot } from "./bot/Bot.js";
import { container } from "./container.js";
import ISessionService from "./interfaces/ISessionService.js";
import { ContainerTypes } from "./types/ContainerTypes.js";

async function bootstrap() {
    // 1. Получаем SessionService и инициализируем подключение к Redis
    const sessionService = container.get<ISessionService>(ContainerTypes.Session);
    await sessionService.init();

    // 2. Теперь, когда store готов, создаём и запускаем бота
    const bot = container.get(Bot);
    await bot.launch();

    console.log("Bot is up and running!");
}

bootstrap().catch(err => {
    console.error("Failed to bootstrap:", err);
    process.exit(1);
});
