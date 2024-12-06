import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiadosService } from './fiados.service';
import { FiadosController } from './fiados.controller';
import { Fiado } from './entities/fiado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fiado])],
  controllers: [FiadosController],
  providers: [FiadosService],
})
export class FiadosModule {}
