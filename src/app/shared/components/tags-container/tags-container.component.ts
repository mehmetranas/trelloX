import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board.service';
import { Tag } from '../../models/schemas';
import { take } from 'rxjs/operators';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-tags-container',
  templateUrl: './tags-container.component.html',
  styleUrls: ['./tags-container.component.scss'],
})
export class TagsContainerComponent implements OnInit {
  tags: Tag[] = [];

  constructor(
    private boardService: BoardService,
    private _bottomSheetRef: MatBottomSheetRef<TagsContainerComponent>
  ) {}

  ngOnInit(): void {
    this.fetchTags();
  }

  fetchTags(): void {
    this.boardService
      .listTags()
      .pipe(take(1))
      .subscribe((tags) => (this.tags = tags));
  }
}
