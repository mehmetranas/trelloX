import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardModule } from './modules/board/board.module';
import { ToolBarModule } from './modules/tool-bar/tool-bar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, BoardModule, ToolBarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
