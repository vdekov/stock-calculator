import { Routes } from '@nestjs/core';
import { ApiModule } from './modules/api/api.module';
import { StockModule } from './modules/stock/stock.module';

export const API_PREFIX = 'api';

// Define routes hierarchical structure of the application
export const routes: Routes = [
  {
    path: API_PREFIX,
    module: ApiModule,
    children: [
      {
        path: 'stock',
        module: StockModule,
      },
    ],
  },
];
