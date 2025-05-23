import {Injectable, Logger} from '@nestjs/common';
import {firstValueFrom} from "rxjs";
import {ConfigService} from "@nestjs/config";
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TranslateService {
    constructor(
        private readonly httpService: HttpService,
        private configService: ConfigService
    ) {
    }
    private readonly logger = new Logger(TranslateService.name);

    async translate(text: string, source_language: string, target_language: string) {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    this.configService.get<string>('CHATGPT_API_URL') + '/translation',
                    {
                        prompt: text,
                        start: source_language,
                        end: target_language,
                    },
                    {
                        headers: {
                            'X-API-KEY': this.configService.get<string>('CHATGPT_API_KEY'),
                        },
                    },
                ),
            );
            this.logger.log(response.data);
            return response.data.translated;
        } catch (error) {
            this.logger.error(`Request failed with error: ${error.message}`);
        }
    }
}
