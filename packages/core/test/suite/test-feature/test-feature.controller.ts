import { Controller, Method } from '../../../';

@Controller()
export class TestController {

    public static getThings(): Method<any> {
        return () => {
            return new Promise((resolve, reject) => {
                resolve({ status: 200 });
            })
        }
    }
}