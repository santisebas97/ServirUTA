import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import {mapbox} from 'mapbox-gl';
import { AppModule } from './app/app.module';

if(!navigator.geolocation){
  'El navegador no admite geolocalización'
throw new Error('El navegador no admite geolocalización')
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
