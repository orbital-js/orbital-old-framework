import { AppModule } from './AppModule';
import { Application } from 'express';
import { platformServer } from '../../src/platform/platform-server';

export const app: Application = platformServer().bootstrap(AppModule);
