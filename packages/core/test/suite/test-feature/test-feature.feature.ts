import { Feature, Route } from '../../../';
import { TestController } from './test-feature.controller';

@Feature({
    path: '',
})
export class TestFeature {


    constructor() {
    }

    @Route({
        path: '/',
        method: 'get',
        function: this
    })
    getThings() { }


}