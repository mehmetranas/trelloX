import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, DragDropModule, MatIconModule],
  exports: [MatToolbarModule, DragDropModule, MatIconModule],
})
export class SharedModule {}
