import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideToastr } from 'ngx-toastr';

import {provideAnimationsAsync} from "@angular/platform-browser/animations/async"

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideToastr()]
};
