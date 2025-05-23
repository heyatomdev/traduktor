import { Module } from '@nestjs/common';
import { TranslateCommand } from './translate.command';
import { TranslateService } from './translate.service';

@Module({
    providers: [TranslateCommand, TranslateService]
})
export class TranslateModule {}
