import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path : 'user',
    component: LayoutComponent,
    // loadChildren : () =>
    // import('../user/user.module').then( m => m.UserModule)
  },

  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
