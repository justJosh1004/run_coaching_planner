import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RunnersComponent } from './runners.component';

const routes: Routes = [{ path: '', component: RunnersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunnersRoutingModule {}
