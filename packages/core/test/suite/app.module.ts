import { Boat } from '../../src';
import { TestFeature } from './test-feature/test-feature.feature'

@Boat({
    features: [
        TestFeature
    ],
    middlewares: [],
    config: {}
})
export class AppModule { }