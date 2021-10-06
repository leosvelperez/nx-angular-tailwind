import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpLib3Component } from './cmp-lib3/cmp-lib3.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CmpLib3Component],
  exports: [CmpLib3Component],
})
export class Lib3Module {}
