import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'callback', component: CallbackComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stats', component: StatsComponent, canActivate: [ AuthGuard ] },
  { path: 'stats/:gamertag', component: StatsComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [ AuthGuard ] },
  { path: 'index', component: IndexComponent },
  { path: '', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
