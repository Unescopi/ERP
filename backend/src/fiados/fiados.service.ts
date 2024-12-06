import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFiadoDto } from './dto/create-fiado.dto';
import { UpdateFiadoDto } from './dto/update-fiado.dto';
import { Fiado } from './entities/fiado.entity';

@Injectable()
export class FiadosService {
  constructor(
    @InjectRepository(Fiado)
    private readonly fiadoRepository: Repository<Fiado>,
  ) {}

  create(createFiadoDto: CreateFiadoDto): Promise<Fiado> {
    const fiado = this.fiadoRepository.create(createFiadoDto);
    return this.fiadoRepository.save(fiado);
  }

  findAll(): Promise<Fiado[]> {
    return this.fiadoRepository.find({ relations: ['cliente'] });
  }

  findOne(id: number): Promise<Fiado> {
    return this.fiadoRepository.findOne({ where: { id }, relations: ['cliente'] });
  }

  async update(id: number, updateFiadoDto: UpdateFiadoDto): Promise<Fiado> {
    await this.fiadoRepository.update(id, updateFiadoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.fiadoRepository.delete(id);
  }
}
