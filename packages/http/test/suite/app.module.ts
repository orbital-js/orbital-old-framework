import { Boat } from '../../';
import { TestFeature } from './test-feature/test-feature.feature'

@Boat({
    features: [
        TestFeature
    ],
    middlewares: [],
    config: {}
})
export class AppModule { }