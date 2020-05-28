import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './components/lazy/lazy.component';

@NgModule({
  declarations: [LazyComponent],
  imports: [
    CommonModule
  ]
})
export class LazyModule { }
