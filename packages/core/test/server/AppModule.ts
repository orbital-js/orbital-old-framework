import { Module } from '../../src/decorators/module';
import { RootController } from './controllers/root.controller';

@Module({
    controllers: [
        RootController
    ],
    config: {
        port: 8080
    }
})
export class AppModule { }
