import { Module } from '@nestjs/common';
import { DiscordModule } from './modules/discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import config from './configs/config.schema';
import {TranslateModule} from "./modules/translate/translate.module";
import {configValidationSchema} from "./configs/config.validation";
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
      validationSchema: configValidationSchema,
    }),
    DiscordModule,
    TranslateModule
  ],
  controllers: [],
})
export class AppModule {}
