import i18n, { InitOptions } from 'i18next';
import { injectable } from 'inversify';

import en from './locales/en.json' with { type: "json" };
import uk from './locales/uk.json' with { type: "json" };

@injectable()
export class LanguageService {
    constructor() {
        const options: InitOptions = {
            fallbackLng: 'en',
            resources: {
                en: { translation: en },
                uk: { translation: uk }
            }
        };

        i18n.init(options);
    }

    t(key: string, lng: string): string {
        return i18n.t(key, { lng });
    }
}