import {Context, Options, SlashCommand, SlashCommandContext, StringOption} from 'necord';
import { CommandInteraction, EmbedBuilder } from 'discord.js';
import {Injectable, UseInterceptors} from '@nestjs/common';
import { TranslateService } from './translate.service';
import {LanguageAutocompleteInterceptor} from "./language.interceptor";

class TranslateDTO {
    @StringOption({
        name: 'text',
        description: 'Text that will be translated',
        required: true
    })
    text: string;

    @StringOption({
        name: 'target_language',
        description: 'Language in witch the text will be translated',
        autocomplete: true,
        required: true
    })
    target_language: string;

    @StringOption({
        name: 'source_language',
        description: 'Manually provide the source language of the text to be translated',
        autocomplete: true
    })
    source_language: string;
}

@Injectable()
export class TranslateCommand {
    constructor(private readonly translateService: TranslateService) {}

    @UseInterceptors(LanguageAutocompleteInterceptor)
    @SlashCommand({
        name: 'translate',
        description: 'Translate a text'
    })
    public async onTranslate(@Context() [interaction]: SlashCommandContext, @Options() { text, target_language, source_language}: TranslateDTO) {
        const translated = await this.translateService.translate(
            text,
            target_language,
            source_language ? source_language : 'it'
        );

        const embed = new EmbedBuilder()
            .setTitle('Translation')
            .addFields(
                { name: 'Original', value: text },
                { name: 'Translated', value: translated },
                { name: 'Target Language', value: target_language }
            )
            .setColor(0x5865F2);

        return interaction.reply({ embeds: [embed] });
    }
}
