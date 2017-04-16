import { Boat } from '../src/decorators/boat';
import { FeatureFeature } from './feature/feature';

import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';

@Boat({
    middlewares: [
        bodyParser.json(),
        helmet(),
        compression()
    ],
    features: [
        FeatureFeature
    ],
    // database: {
    //     hosts: [{
    //         host: '',
    //         port: 12
    //     }]
    // }
})
export class AppModule { }