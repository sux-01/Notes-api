import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (!note) throw new NotFoundException(`Note #${id} not found`);
    return note;
  }

  async create(data: Partial<Note>): Promise<Note> {
    const note = this.notesRepository.create(data);
    return this.notesRepository.save(note);
  }

  async update(id: number, data: Partial<Note>): Promise<Note> {
    await this.notesRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}