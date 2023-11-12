import { Routes } from '@nestjs/core';
import { ApiModule } from './modules/api/api.module';
import { ShareModule } from './modules/share/share.module';

export const API_PREFIX = 'api';

// Define routes hierarchical structure of the application
export const routes: Routes = [
  {
    path: API_PREFIX,
    module: ApiModule,
    children: [
      {
        path: 'share',
        module: ShareModule,
      },
    ],
  },
];
