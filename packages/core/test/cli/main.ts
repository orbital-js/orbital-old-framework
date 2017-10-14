import { platformCli } from '../../cli';
import { AppModule } from './app.module';

platformCli().bootstrap(AppModule);
