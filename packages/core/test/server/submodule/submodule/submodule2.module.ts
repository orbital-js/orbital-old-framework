import { Module, ModuleWithProviders } from '../../../../src/core';
import { HelloController } from './hello/hello.controller';
import { TestService } from './test.service';

@Module({
    controllers: [
        HelloController
    ],
})
export class SubModule2 {
    static forRoot(): ModuleWithProviders {
        return {
            obModule: SubModule2,
            providers: [TestService]
        };
    }
}
