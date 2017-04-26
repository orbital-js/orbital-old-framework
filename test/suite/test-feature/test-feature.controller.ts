import { Controller } from '../../../src';

@Controller()
export class TestController {
    public static getThings(): Promise<any> {

        return new Promise((resolve, reject) => { })
    }
}