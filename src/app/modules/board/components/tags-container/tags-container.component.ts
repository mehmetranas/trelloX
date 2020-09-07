import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Tag } from 'src/app/shared/models/schemas';
import { BoardService } from '../../board.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tags-container',
  templateUrl: './tags-container.component.html',
  styleUrls: ['./tags-container.component.scss'],
})
export class TagsContainerComponent implements OnInit {
  @Input() tagsSelected: Tag[] = [];
  @Input() tags: Tag[] = [];
  @Output() removeTagFromCard = new EventEmitter<string>();
  @Output() saveTag = new EventEmitter<Tag>();
  @Output() addTagToCard = new EventEmitter<Tag>();
  displayTags: boolean = false;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService
      .listTags()
      .pipe(take(1))
      .subscribe((tags) => (this.tags = tags));
  }

  _removeTagFromCard(tagId: string): void {
    this.removeTagFromCard.emit(tagId);
  }

  _saveTag(tag: Tag): void {
    this.saveTag.emit(tag);
  }

  _addTagToCard(tag: Tag): void {
    this.addTagToCard.emit(tag);
  }

  isTagAdded(tagId: string): boolean {
    return this.tagsSelected.findIndex((tag) => tag.id === tagId) > -1;
  }
}
