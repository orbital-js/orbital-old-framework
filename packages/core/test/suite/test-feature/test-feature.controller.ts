import { Controller, Method } from '../../../src';

@Controller()
export class TestController {
    public static getThings(): Method<any> {
        return () => {
            return new Promise((resolve, reject) => { })
        }
    }
}