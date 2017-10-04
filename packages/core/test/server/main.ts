import { AppModule } from './AppModule';
import { Application } from 'express';
import { platformServer } from '../../src/methods/bootstrap';

export const app: Application = platformServer().bootstrap(AppModule);
