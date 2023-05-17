import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/quiz.routes';
import { AppComponent } from './app/app.component';

// @Component({
//   selector: 'my-app',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   template: `<router-outlet></router-outlet>`,
// })
// export class App {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
