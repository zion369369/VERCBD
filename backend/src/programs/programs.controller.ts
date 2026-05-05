import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program' })
  create(@Body() data: Prisma.ProgramCreateInput) {
    return this.programsService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get a program by slug' })
  findOne(@Param('slug') slug: string) {
    return this.programsService.findOne(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a program' })
  update(@Param('id') id: string, @Body() data: Prisma.ProgramUpdateInput) {
    return this.programsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a program' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}
