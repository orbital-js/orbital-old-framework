import { Orbital } from '../../';
import { TestFeature } from './test-feature/test-feature.feature'

@Orbital({
    features: [
        TestFeature
    ],
    middlewares: [],
    config: {}
})
export class AppModule { }