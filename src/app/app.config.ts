import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';

import {provideAnimationsAsync} from "@angular/platform-browser/animations/async"
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideToastr()]
};
