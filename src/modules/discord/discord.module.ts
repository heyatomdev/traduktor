import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';

@Module({
  imports: [
    NecordModule.forRoot({
      token: '',
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
      ],
    }),
  ],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
