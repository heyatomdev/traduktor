import { Module } from '@nestjs/common';
import { TranslateCommand } from './translate.command';
import { TranslateService } from './translate.service';
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    providers: [TranslateCommand, TranslateService]
})
export class TranslateModule {}
