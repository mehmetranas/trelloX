import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';
import { InputCommentAreaComponent } from './components/input-comment-area/input-comment-area.component';
import { CreateCardInputComponent } from './create-card-input/create-card-input.component';
import { SelectColorMenuButtonComponent } from './components/select-color-menu-button/select-color-menu-button.component';
import { TagsContainerComponent } from './components/tags-container/tags-container.component';

@NgModule({
  declarations: [
    BoardComponent,
    ListComponent,
    CardDetailComponent,
    CommentComponent,
    InputCommentAreaComponent,
    CreateCardInputComponent,
    SelectColorMenuButtonComponent,
    TagsContainerComponent,
  ],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
  entryComponents: [CardDetailComponent],
  exports: [BoardComponent],
})
export class BoardModule {}
