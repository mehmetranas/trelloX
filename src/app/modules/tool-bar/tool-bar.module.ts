import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [ToolbarComponent],
})
export class ToolBarModule {}
