import { Module } from '../../../src/decorators/module';
import { RootController } from './controllers/root/root.controller';
import { ExitMiddleware } from './middlewares/exit.middleware';
import { SubModule2 } from './submodule/submodule2.module';

@Module({
    imports: [
        SubModule2.forRoot()
    ],
    controllers: [
        RootController
    ],
    middlewares: [
        ExitMiddleware
    ],
    config: {
        path: '/submodule'
    }
})
export class SubModule { }
