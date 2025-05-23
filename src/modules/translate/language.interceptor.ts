import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from 'necord';

const LANGUAGE_MAP: Record<string, string> = {
    en: 'English',
    it: 'Italian',
    fr: 'French',
    es: 'Spanish',
    de: 'German',
};

@Injectable()
export class LanguageAutocompleteInterceptor extends AutocompleteInterceptor {
    public transformOptions(interaction: AutocompleteInteraction) {
        const focused = interaction.options.getFocused(true);
        let choices: string[] = [];

        if (focused.name === 'target_language' || focused.name === 'source_language') {
            choices = Object.keys(LANGUAGE_MAP);
        }

        return interaction.respond(
            choices
                .filter(code =>
                    LANGUAGE_MAP[code].toLowerCase().startsWith(focused.value.toString().toLowerCase()) ||
                    code.startsWith(focused.value.toString().toLowerCase())
                )
                .map(code => ({
                    name: LANGUAGE_MAP[code],
                    value: code,
                }))
        );
    }
}
