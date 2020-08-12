import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LastJobInfoComponent } from './last-job-info/last-job-info.component';
import { CreateNewJobComponent } from './create-new-job/create-new-job.component';


const routes: Routes = [
  {path: 'CreateNewJob', component: CreateNewJobComponent},
  {path: '**', component: LastJobInfoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
