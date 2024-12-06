import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PDVModule } from './pdv/pdv.module';
import { EstoqueModule } from './estoque/estoque.module';
import { ProdutoModule } from './produto/produto.module';
import { ClienteModule } from './cliente/cliente.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { FiadosModule } from './fiados/fiados.module';
import { IntegracoesModule } from './integracoes/integracoes.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { AuthModule } from './auth/auth.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { RelatoriosDetalhadosModule } from './relatorios-detalhados/relatorios-detalhados.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'cafeteria',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PDVModule,
    EstoqueModule,
    ProdutoModule,
    ClienteModule,
    UsuariosModule,
    RelatoriosModule,
    ConfiguracoesModule,
    PagamentosModule,
    FiadosModule,
    IntegracoesModule,
    NotificacoesModule,
    AuditoriaModule,
    AuthModule,
    FornecedoresModule,
    RelatoriosDetalhadosModule,
  ],
})
export class AppModule {}
