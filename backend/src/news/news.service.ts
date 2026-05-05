import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { News, Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<News[]> {
    return this.prisma.news.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  }

  async create(data: Prisma.NewsCreateInput): Promise<News> {
    return this.prisma.news.create({ data });
  }
}
