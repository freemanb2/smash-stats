import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { SettingsComponent } from './settings/settings.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'stats', component: StatsComponent },
  { path: 'stats/:playerName', component: StatsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'index', component: IndexComponent },
  { path: '', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
