import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardModule } from './modules/board/board.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './modules/toolbar/components/toolbar/toolbar.component';
import { SearchBarComponent } from './modules/toolbar/components/search-bar/search-bar.component';
import { ToolbarModule } from './modules/toolbar/toolbar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BoardModule,
    MatToolbarModule,
    ToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
