import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, DragDropModule],
  exports: [MatToolbarModule, DragDropModule],
})
export class SharedModule {}
