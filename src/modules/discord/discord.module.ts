import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    NecordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const token = configService.get<string>('discord.token');
        if (!token) {
          throw new Error('Discord token is not defined in configuration');
        }
        return {
          token,
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
