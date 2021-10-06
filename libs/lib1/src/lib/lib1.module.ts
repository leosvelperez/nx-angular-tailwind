import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpLib1Component } from './cmp-lib1/cmp-lib1.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CmpLib1Component],
  exports: [CmpLib1Component],
})
export class Lib1Module {}
