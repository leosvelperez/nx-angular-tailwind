import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpLib2Component } from './cmp-lib2/cmp-lib2.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CmpLib2Component],
  exports: [CmpLib2Component],
})
export class Lib2Module {}
