// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { provideStore } from '@ngrx/store';
// import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
// import { routes } from './app.routes';
// import { authReducer } from './store/auth/auth.reducer';
// import { AuthEffects } from './store/auth/auth.effects';
// import { provideAnimations } from '@angular/platform-browser/animations';
// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(),
//     provideStore({ auth: authReducer }),
//     provideEffects([AuthEffects]),
//     provideStoreDevtools({ maxAge: 25, logOnly: false }),
//     provideAnimations(),
//   ],
// };

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { adminReducer } from './store/admin/admin.reducer';
import { AdminEffects } from './store/admin/admin.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ auth: authReducer, admin: adminReducer }),
    provideEffects([AuthEffects, AdminEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false, connectInZone: true }),
    provideAnimations(),
  ],
};
