import { AppModule } from './app.module';
import { bootstrap } from '../src/methods/bootstrap';

bootstrap(AppModule, {
    port: 8080
});