import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Share } from './modules/share/entities/share.entity';

@Module({
  imports: [
    ApiModule,
    RouterModule.register(routes),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3307,
      username: 'root',
      database: 'stock_calculator',
      entities: [Share],
      // synchronize: true, // synchronize: true; shouldn't be used in production
    }),
  ],
})
export class AppModule {}
