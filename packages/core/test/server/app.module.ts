import 'reflect-metadata';
import { BodyParserJson } from '../../../middlewares/src/body-parser/json';
import { Module } from '../../src/decorators/module';
import { BodyController } from './controllers/body/body.controller';
import { JsonController } from './controllers/json/json.controller';
import { RootController } from './controllers/root/root.controller';
import { SubModule } from './submodule/submodule.module';


@Module({
    imports: [
        SubModule
    ],
    controllers: [
        RootController,
        JsonController,
        BodyController
    ],
    middlewares: [
        BodyParserJson
    ],
    config: {
        port: 8080
    }
})
export class AppModule { }
