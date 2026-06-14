import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() body: { title: string; content: string }) {
    return this.notesService.create(body);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { title?: string; content?: string }) {
    return this.notesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}