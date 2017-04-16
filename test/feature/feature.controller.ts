import { Controller } from '../../src/decorators/controller';

@Controller()
export class FeatureController {
    public static main(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve({ msg: 'HI TEST', status: 200 });
        })
    }

} 