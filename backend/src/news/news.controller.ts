import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create news entry' })
  create(@Body() data: Prisma.NewsCreateInput) {
    return this.newsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news' })
  findAll() {
    return this.newsService.findAll();
  }
}
