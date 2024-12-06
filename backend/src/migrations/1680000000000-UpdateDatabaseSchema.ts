import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class UpdateDatabaseSchema1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update Fornecedores Table
    await queryRunner.addColumn('fornecedores', new TableColumn({
      name: 'pedidosAutomaticos',
      type: 'jsonb',
      isNullable: true,
    }));

    await queryRunner.addColumn('fornecedores', new TableColumn({
      name: 'avaliacoes',
      type: 'jsonb',
      isNullable: true,
    }));

    await queryRunner.addColumn('fornecedores', new TableColumn({
      name: 'metadados',
      type: 'jsonb',
      isNullable: true,
    }));

    // Create Payment Configurations Table
    await queryRunner.createTable(new Table({
      name: 'payment_configurations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'gateway',
          type: 'varchar',
        },
        {
          name: 'credentials',
          type: 'jsonb',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true);

    // Create Automatic Orders Table
    await queryRunner.createTable(new Table({
      name: 'automatic_orders',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'fornecedorId',
          type: 'uuid',
        },
        {
          name: 'produtos',
          type: 'jsonb',
        },
        {
          name: 'frequenciaEmDias',
          type: 'int',
        },
        {
          name: 'ativo',
          type: 'boolean',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true);

    await queryRunner.createForeignKey('automatic_orders', new TableForeignKey({
      columnNames: ['fornecedorId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'fornecedores',
      onDelete: 'CASCADE'
    }));

    // Create Supplier Evaluations Table
    await queryRunner.createTable(new Table({
      name: 'supplier_evaluations',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'fornecedorId',
          type: 'uuid',
        },
        {
          name: 'avaliacao',
          type: 'jsonb',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true);

    await queryRunner.createForeignKey('supplier_evaluations', new TableForeignKey({
      columnNames: ['fornecedorId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'fornecedores',
      onDelete: 'CASCADE'
    }));

    // Create Payment Transactions Table
    await queryRunner.createTable(new Table({
      name: 'payment_transactions',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()'
        },
        {
          name: 'amount',
          type: 'decimal',
        },
        {
          name: 'method',
          type: 'varchar',
        },
        {
          name: 'status',
          type: 'varchar',
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'now()'
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment_transactions');
    await queryRunner.dropTable('supplier_evaluations');
    await queryRunner.dropTable('automatic_orders');
    await queryRunner.dropTable('payment_configurations');
    await queryRunner.dropColumn('fornecedores', 'pedidosAutomaticos');
    await queryRunner.dropColumn('fornecedores', 'avaliacoes');
    await queryRunner.dropColumn('fornecedores', 'metadados');
  }
}
