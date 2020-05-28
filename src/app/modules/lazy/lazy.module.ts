import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './components/lazy/lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';

import('../../../styles/modules/lazy/index.scss' as any);

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule,
    LazyRoutingModule,
  ]
})
export class LazyModule { }
