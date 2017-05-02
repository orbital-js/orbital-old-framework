import { Feature, Route } from '../../../src';
import { TestController } from './test-feature.controller';

@Feature({
    path: '/',
})
export class TestFeature {
    @Route({
        path: '/',
        method: 'get',
        function: TestController.getThings()
    })
    getThings() { }

    
}