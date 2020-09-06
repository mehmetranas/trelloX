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
import { TagsContainerComponent } from 'src/app/shared/components/tags-container/tags-container.component';
import { BoardService } from '../../board.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardDetailComponent implements OnInit {
  cardForm: FormGroup;
  newComment: string;
  tags: Tag[];
  displayTags: boolean = false;
  onNewComment: boolean = false;
  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private _bottomSheet: MatBottomSheet,
    public dialogRef: MatDialogRef<CardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card; listId: string }
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
    if (this.data.card != null) {
      this.cardForm.patchValue({
        title: this.data.card.title,
        id: this.data.card.id,
        tags: this.data.card.tags,
      });
    }
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

  addComment() {
    let newComment: UserComment = new UserComment();
    newComment.content = this.newComment;
    this.boardService.addComment(
      newComment,
      this.data.card.id,
      this.data.listId
    );
    this.newComment = '';
    this.onNewComment = false;
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
