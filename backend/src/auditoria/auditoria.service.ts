import { Injectable } from '@nestjs/common';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';

@Injectable()
export class AuditoriaService {
  create(createAuditoriaDto: CreateAuditoriaDto) {
    return 'This action adds a new auditoria record';
  }

  findAll() {
    return 'This action returns all auditoria records';
  }

  findByDate(inicio: string, fim: string) {
    return `This action returns auditoria records between ${inicio} and ${fim}`;
  }

  findByUser(usuarioId: number) {
    return `This action returns auditoria records for user #${usuarioId}`;
  }

  findByType(tipo: string) {
    return `This action returns auditoria records of type ${tipo}`;
  }
}
