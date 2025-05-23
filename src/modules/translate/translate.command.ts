import { Context, Options, SlashCommand } from 'necord';
import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { TranslateService } from './translate.service';

class TranslateDTO {
    text: string;
    lang: string;
}

@Injectable()
export class TranslateCommand {
    constructor(private readonly translateService: TranslateService) {}

    @SlashCommand({
        name: 'translate',
        description: 'Traduci un messaggio in un\'altra lingua'
    })
    async onTranslate(@Context() [interaction]: [CommandInteraction], @Options() options: TranslateDTO) {
        const translated = await this.translateService.translate(options.text, options.lang);
        await interaction.reply(translated);
    }
}
