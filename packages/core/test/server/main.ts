import { Application } from 'express';
import { platformServer } from '../../src/platform/platform-server';
import { AppModule } from './app.module';

export const app: Application = platformServer().bootstrap(AppModule);
