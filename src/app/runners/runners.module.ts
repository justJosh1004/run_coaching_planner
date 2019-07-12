import { NgModule } from '@angular/core';
import { RunnersRoutingModule } from './runners-routing.module';
import { RunnersComponent } from './runners.component';

@NgModule({
  declarations: [RunnersComponent],
  imports: [RunnersRoutingModule]
})
export class RunnersModule {}
