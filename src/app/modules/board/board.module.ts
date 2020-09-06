import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    BoardComponent,
    ListComponent,
    CardComponent,
    CardDetailComponent,
    CommentComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
  entryComponents: [CardDetailComponent],
  exports: [BoardComponent],
})
export class BoardModule {}
