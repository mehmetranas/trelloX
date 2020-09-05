import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BoardComponent,
    ListComponent,
    CardComponent,
    CardDetailComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  entryComponents: [CardDetailComponent],
  exports: [BoardComponent],
})
export class BoardModule {}
