import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';

const { DB_PORT, DB_DATABASE, DB_HOST, DB_USER } = process.env;

@Module({
  imports: [
    ApiModule,
    RouterModule.register(routes),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      database: DB_DATABASE,
      entities: [Stock],
    }),
  ],
})
export class AppModule {}
