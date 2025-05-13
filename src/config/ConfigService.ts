import { config, DotenvParseOutput } from "dotenv";
import { injectable } from "inversify";
import { IConfigService } from "../interfaces/IConfigService.js";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const { error, parsed } = config();
    if (error) {
      throw new Error(`Failed to load .env file: ${error.message}`);
    }

    if (!parsed) {
      throw new Error("No configuration found in .env file");
    }

    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error(`Config key "${key}" not found`);
    }
    return res;
  }
}
