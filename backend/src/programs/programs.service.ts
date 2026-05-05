import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Program, Prisma } from '@prisma/client';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Program[]> {
    return this.prisma.program.findMany();
  }

  async findOne(slug: string): Promise<Program | null> {
    return this.prisma.program.findUnique({
      where: { slug },
    });
  }

  async create(data: Prisma.ProgramCreateInput): Promise<Program> {
    return this.prisma.program.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProgramUpdateInput): Promise<Program> {
    return this.prisma.program.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Program> {
    return this.prisma.program.delete({
      where: { id },
    });
  }
}
