import { FeatureController } from './feature.controller';
import { Feature } from '../../src/decorators/feature';
import { Route } from '../../src/decorators/route';

@Feature({
    path: '/feature'
})
export class FeatureFeature {
    constructor() { }

    @Route({
        method: 'get',
        path: '/main',
        function: FeatureController.main
    })
    public static main() { }

}