import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [BoardComponent, ListComponent, CardComponent],
  imports: [CommonModule, SharedModule],
  exports: [BoardComponent],
})
export class BoardModule {}
