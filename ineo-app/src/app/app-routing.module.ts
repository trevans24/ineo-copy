// Importing Component
import { AppComponent } from './app.component';
import { UnlockComponent } from './unlock/unlock.component';

// Import routing and module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Define ROUTES
const routes: Routes = [
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'unlock',
    component: UnlockComponent
  }
];

// Module for import/export
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

// Export Routing Module
export class AppRoutingModule {}
