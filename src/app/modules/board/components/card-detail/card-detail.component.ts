import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card, Tag, UserComment } from 'src/app/shared/models/schemas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BoardService } from '../../board.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  cardForm: FormGroup;
  card: Card;
  newComment: UserComment = new UserComment();
  tags: Tag[];
  displayTags: boolean = false;
  onEditCardTitle: boolean = false;
  onNewComment: boolean = false;
  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private _bottomSheet: MatBottomSheet,
    public dialogRef: MatDialogRef<CardDetailComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { cardId: string; card: Card; listId: string }
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.boardService
      .listTags()
      .pipe(take(1))
      .subscribe((tags) => (this.tags = tags));
  }

  initForm(): void {
    this.cardForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      tags: [[]],
    });
    if (this.data.cardId != null) {
      this.boardService
        .getCardById(this.data.cardId, this.data.listId)
        .pipe(take(1))
        .subscribe((card) => {
          this.patchForm(card);
          this.card = card;
          console.log('card', card);
        });
    }
  }

  private patchForm(card: Card) {
    this.cardForm.patchValue({
      title: card.title,
      id: card.id,
      tags: card.tags || [],
    });
  }

  saveCard(): void {
    if (this.cardForm.invalid) return;
    let card = { ...this.cardForm.value };
    let responseCard: Card;
    if (card.id) {
      responseCard = this.boardService.updateCard(card, this.data.listId);
    } else {
      responseCard = this.boardService.addCard(card, this.data.listId);
    }
    this.patchForm(responseCard);
    this.onEditCardTitle = false;
  }

  addTagToCard(tag: Tag): void {
    let currentState = this.cardForm.get('tags').value;
    currentState.push(tag);
  }

  isTagAdded(tagId: string): boolean {
    const selectedTags: Tag[] = this.cardForm.get('tags').value;
    return selectedTags.findIndex((tag) => tag.id === tagId) > -1;
  }

  removeTagFromCard(tagId: string): void {
    let currentTagsState: Tag[] = this.cardForm.get('tags').value;
    const i = currentTagsState.findIndex((tag) => tag.id === tagId);
    if (i > -1) {
      currentTagsState.splice(i, 1);
    }
  }

  saveTag(tag: Tag) {
    this.boardService.updateTagTitle(tag);
    console.log('saved');
  }

  addOrUpdateComment(event: string) {
    if (this.cardForm.invalid || !this.cardForm.get('id').value) return;
    this.newComment.content = event;
    const responseComment = this.boardService.addOrUpdateComment(
      this.newComment,
      this.cardForm.get('id').value,
      this.data.listId
    );
    this.newComment = new UserComment();
    this.onNewComment = false;
  }

  deleteComment(commentId: string) {
    this.boardService.deleteComment(commentId, this.data.listId, this.card.id);
    // Prevent an issue, if this comment on edit
    this.newComment = new UserComment();
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
