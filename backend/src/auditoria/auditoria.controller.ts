import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuditoriaService } from './auditoria.service';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('auditoria')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Post()
  create(@Body() createAuditoriaDto: CreateAuditoriaDto) {
    return this.auditoriaService.create(createAuditoriaDto);
  }

  @Get()
  findAll() {
    return this.auditoriaService.findAll();
  }

  @Get('por-data')
  findByDate(@Query('inicio') inicio: string, @Query('fim') fim: string) {
    return this.auditoriaService.findByDate(inicio, fim);
  }

  @Get('por-usuario')
  findByUser(@Query('usuarioId') usuarioId: string) {
    return this.auditoriaService.findByUser(+usuarioId);
  }

  @Get('por-tipo')
  findByType(@Query('tipo') tipo: string) {
    return this.auditoriaService.findByType(tipo);
  }
}
