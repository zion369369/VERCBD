import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgramsModule } from './programs/programs.module';
import { NewsModule } from './news/news.module';

@Module({
  imports: [ProgramsModule, NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
