import { AppModule } from './app.module';
import { bootstrap } from '../src/methods/bootstrap';

console.log('BS Started');
bootstrap(AppModule, {
    port: 8080
});
console.log('App Running');