import { Injectable } from '@nestjs/common';

@Injectable()
export class TranslateService {
    async translate(text: string, targetLang: string): Promise<string> {
        // Simulazione traduzione
        return `[${targetLang}] ${text}`;
    }
}
