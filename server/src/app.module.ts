import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './routes';

@Module({
  imports: [ApiModule, RouterModule.register(routes)],
})
export class AppModule {}
