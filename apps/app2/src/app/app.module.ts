import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Lib1Module } from '@my-org/lib1';
import { Lib2Module } from '@my-org/lib2';
import { Lib3Module } from '@my-org/lib3';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, Lib1Module, Lib2Module, Lib3Module],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
